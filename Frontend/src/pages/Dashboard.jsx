import { useEffect, useMemo, useState } from 'react';
import { getUsername } from '../services/authService';
import {
    createPersonalTask,
    getPersonalTasks,
    getWorkspaceTasks,
    createWorkspaceTask,
    updatePersonalTask,
    updateWorkspaceTask,
} from '../services/taskService';
import {
    createWorkspace as createWorkspaceRequest,
    getWorkspaces,
    addMember,
} from '../services/workspaceService';
import './Dashboard.css';

const filters = ['All tasks', 'Today', 'Upcoming', 'Completed'];
const personalWorkspace = { id: null, name: 'Personal', description: 'Your personal workspace' };

function toUiTask(task) {
    const priority = task.priority >= 2 ? 'High' : task.priority === 1 ? 'Medium' : 'Low';
    const due = task.due_date
        ? new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : 'Today';
    return {
        id: task.id,
        title: task.title,
        description: task.description || '',
        project: 'Personal',
        workspaceId: task.workspace_id ?? null,
        due,
        dueDate: task.due_date,
        priority,
        priorityValue: task.priority,
        status: task.status,
        done: task.status === 'completed',
    };
}

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [workspaces, setWorkspaces] = useState([personalWorkspace]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(personalWorkspace);
    const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
    const [workspaceDialog, setWorkspaceDialog] = useState(null);
    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceDescription, setWorkspaceDescription] = useState('');
    const [memberUsernameOrEmail, setMemberUsernameOrEmail] = useState('');
    const [activeFilter, setActiveFilter] = useState('All tasks');
    const [search, setSearch] = useState('');
    const [newTask, setNewTask] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newStatus, setNewStatus] = useState('pending');
    const [newPriority, setNewPriority] = useState('0');
    const [taskError, setTaskError] = useState('');
    const [workspaceError, setWorkspaceError] = useState('');
    const [inviteError, setInviteError] = useState('');
    const [inviteSuccess, setInviteSuccess] = useState('');
    const [isCreatingTask, setIsCreatingTask] = useState(false);
    const [isInviting, setIsInviting] = useState(false);
    const [loadedWorkspaceIds, setLoadedWorkspaceIds] = useState(new Set());
    const username = getUsername();

    useEffect(() => {
        let isCurrent = true;

        Promise.all([getPersonalTasks(), getWorkspaces()])
            .then(([savedTasks, savedWorkspaces]) => {
                if (!isCurrent) return;
                setTasks(savedTasks.map(toUiTask));
                setWorkspaces([personalWorkspace, ...savedWorkspaces]);
            })
            .catch((error) => {
                if (isCurrent) setTaskError(error.message);
            });

        return () => {
            isCurrent = false;
        };
    }, []);

    // Load workspace tasks whenever the selected workspace changes
    useEffect(() => {
        if (!selectedWorkspace.id || loadedWorkspaceIds.has(selectedWorkspace.id)) {
            return;
        }

        let isCurrent = true;
        getWorkspaceTasks(selectedWorkspace.id)
            .then((savedWorkspaceTasks) => {
                if (!isCurrent) return;
                setTasks((current) => [
                    ...current,
                    ...savedWorkspaceTasks.map(toUiTask),
                ]);
                setLoadedWorkspaceIds((current) => new Set(current).add(selectedWorkspace.id));
            })
            .catch((error) => {
                if (isCurrent) setTaskError(error.message);
            });

        return () => {
            isCurrent = false;
        };
    }, [selectedWorkspace, loadedWorkspaceIds]);

    const workspaceTasks = useMemo(
        () =>
            tasks.filter((task) =>
                selectedWorkspace.id === null
                    ? task.workspaceId === null
                    : task.workspaceId === selectedWorkspace.id
            ),
        [selectedWorkspace, tasks]
    );

    const visibleTasks = useMemo(
        () =>
            workspaceTasks.filter((task) => {
                const matchesFilter =
                    activeFilter === 'All tasks' ||
                    (activeFilter === 'Today' && task.due === 'Today') ||
                    (activeFilter === 'Upcoming' && task.due !== 'Today' && !task.done) ||
                    (activeFilter === 'Completed' && task.done);
                return matchesFilter && task.title.toLowerCase().includes(search.toLowerCase());
            }),
        [activeFilter, search, workspaceTasks]
    );

    const completedCount = workspaceTasks.filter((task) => task.done).length;
    const progress = workspaceTasks.length ? Math.round((completedCount / workspaceTasks.length) * 100) : 0;

    const toggleTask = async (task) => {
        const status = task.done ? 'pending' : 'completed';
        const taskData = {
            title: task.title,
            description: task.description || null,
            status,
            priority: task.priorityValue,
            due_date: task.dueDate || null,
        };

        setTaskError('');
        try {
            const savedTask = task.workspaceId === null
                ? await updatePersonalTask(task.id, taskData)
                : await updateWorkspaceTask(task.workspaceId, task.id, taskData);
            setTasks((current) => current.map((currentTask) =>
                currentTask.id === task.id && currentTask.workspaceId === task.workspaceId
                    ? toUiTask(savedTask)
                    : currentTask
            ));
        } catch (error) {
            setTaskError(error.message);
        }
    };

    const addTask = async (event) => {
        event.preventDefault();
        if (!newTask.trim()) return;
        setTaskError('');
        setIsCreatingTask(true);
        try {
            const taskData = {
                title: newTask.trim(),
                description: newDescription.trim() || null,
                status: newStatus,
                priority: Number(newPriority),
            };

            const task = selectedWorkspace.id === null
                ? await createPersonalTask(taskData)
                : await createWorkspaceTask(selectedWorkspace.id, taskData);

            setTasks((current) => [toUiTask(task), ...current]);
            setNewTask('');
            setNewDescription('');
            setNewStatus('pending');
            setNewPriority('0');
        } catch (error) {
            setTaskError(error.message);
        } finally {
            setIsCreatingTask(false);
        }
    };

    const createWorkspace = async (event) => {
        event.preventDefault();
        if (!workspaceName.trim()) return;
        setWorkspaceError('');
        try {
            const workspace = await createWorkspaceRequest({
                name: workspaceName.trim(),
                description: workspaceDescription.trim() || null,
            });
            setWorkspaces((current) => [...current, workspace]);
            setSelectedWorkspace(workspace);
            setWorkspaceName('');
            setWorkspaceDescription('');
            setWorkspaceDialog(null);
        } catch (error) {
            setWorkspaceError(error.message);
        }
    };

    const inviteMember = async (event) => {
        event.preventDefault();
        if (!memberUsernameOrEmail.trim()) return;
        if (selectedWorkspace.id === null) {
            setInviteError('Please select a workspace before inviting members.');
            return;
        }
        setInviteError('');
        setInviteSuccess('');
        setIsInviting(true);
        try {
            await addMember(selectedWorkspace.id, {
                usernameOrEmail: memberUsernameOrEmail.trim(),
            });
            setMemberUsernameOrEmail('');
            setInviteSuccess(`Invited ${memberUsernameOrEmail.trim()} to ${selectedWorkspace.name}`);
        } catch (error) {
            setInviteError(error.message);
        } finally {
            setIsInviting(false);
        }
    };

    const isPersonal = selectedWorkspace.id === null;

    return (
        <div className="dashboard-shell">
            <aside className="sidebar">
                <div className="brand"><span className="brand-mark">✓</span><span>stride</span></div>
                <div className="workspace-picker"><button className="workspace-switcher" onClick={() => setWorkspaceMenuOpen((open) => !open)} aria-expanded={workspaceMenuOpen}><span className="workspace-avatar">{selectedWorkspace.name.charAt(0).toUpperCase()}</span><span><strong>{selectedWorkspace.name}</strong><small>{selectedWorkspace.description}</small></span><span className="chevron">⌄</span></button>{workspaceMenuOpen && <div className="workspace-menu"><p>Workspaces</p>{workspaces.map((workspace) => <button key={workspace.id ?? 'personal'} className={workspace.id === selectedWorkspace.id ? 'workspace-option selected' : 'workspace-option'} onClick={() => { setSelectedWorkspace(workspace); setWorkspaceMenuOpen(false); }}><span className="workspace-option-mark">{workspace.name.charAt(0).toUpperCase()}</span><span>{workspace.name}<small>{workspace.description}</small></span>{workspace.id === selectedWorkspace.id && <b>✓</b>}</button>)}<button className="workspace-action" onClick={() => { setWorkspaceDialog('create'); setWorkspaceMenuOpen(false); }}>＋ Create workspace</button><button className="workspace-action" onClick={() => { setWorkspaceDialog('invite'); setWorkspaceMenuOpen(false); }}>＋ Invite member</button></div>}</div>
                <nav className="sidebar-nav" aria-label="Main navigation">
                    <button className="nav-item active"><span>▦</span>Overview</button>
                    <button className="nav-item"><span>✓</span>My tasks <b>{tasks.filter((task) => !task.done).length}</b></button>
                    <button className="nav-item"><span>▤</span>Projects</button>
                    <button className="nav-item"><span>◷</span>Calendar</button>
                </nav>
                <div className="sidebar-section"><p>Projects <button className="small-action" aria-label="Add project">+</button></p><button className="project-link"><i className="dot coral" />Website redesign</button><button className="project-link"><i className="dot blue" />Freelance</button><button className="project-link"><i className="dot green" />Personal</button></div>
                <div className="workspace-actions"><p>Workspace actions</p><button onClick={() => setWorkspaceDialog('create')}><span>＋</span>Create workspace</button><button onClick={() => setWorkspaceDialog('invite')}><span>＋</span>Invite member</button></div>
                <div className="sidebar-bottom"><button className="nav-item"><span>⚙</span>Settings</button><div className="user-chip"><span className="user-avatar">{username.slice(0, 2).toUpperCase()}</span><span><strong>{username}</strong><small>Free plan</small></span><span className="more">•••</span></div></div>
            </aside>

            <main className="dashboard-main">
                <header className="topbar"><div className="breadcrumbs">{selectedWorkspace.name} <span>/</span> Overview</div><div className="top-actions"><button className="icon-button" aria-label="Search">⌕</button><button className="icon-button" aria-label="Notifications">♢<em /></button><button className="create-button" onClick={() => document.querySelector('.quick-add input')?.focus()}><span>+</span> New task</button></div></header>
                <div className="content-wrap">
                    <section className="welcome-row"><div><p className="eyebrow">Wednesday, August 19, 2026</p><h1>Good morning, {username} <span>✦</span></h1><p className="subheading">Here's what's happening with your work today.</p></div><div className="focus-note"><span>◒</span><div><strong>Keep your momentum</strong><small>{completedCount} of {tasks.length} tasks complete</small></div></div></section>

                    <section className="stats-grid" aria-label="Task summary"><div className="stat-card accent-card"><span className="stat-icon">◷</span><div><small>Due today</small><strong>{workspaceTasks.filter((task) => task.due === 'Today' && !task.done).length}</strong><p>Tasks to finish</p></div></div><div className="stat-card"><span className="stat-icon green-icon">✓</span><div><small>Completed</small><strong>{completedCount}</strong><p>Tasks this week</p></div></div><div className="stat-card"><span className="stat-icon blue-icon">▤</span><div><small>Active projects</small><strong>{workspaceTasks.length ? 1 : 0}</strong><p>Across your workspace</p></div></div><div className="progress-card"><div className="progress-heading"><div><small>Weekly progress</small><strong>{progress}%</strong></div><span>On track</span></div><div className="progress-track"><i style={{ width: `${progress}%` }} /></div><p>Great work. You're building a strong habit.</p></div></section>

                    <section className="tasks-section"><div className="section-heading"><div><h2>{isPersonal ? 'Personal tasks' : `${selectedWorkspace.name} tasks`}</h2><p>Stay focused on what matters most.</p></div><button className="view-all" onClick={() => setActiveFilter('All tasks')}>View all <span>→</span></button></div><div className="task-toolbar"><div className="filter-tabs">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'selected' : ''} onClick={() => setActiveFilter(filter)}>{filter}{filter === 'All tasks' && <small>{workspaceTasks.length}</small>}</button>)}</div><label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks" /></label></div>
                    <form className="quick-add" onSubmit={addTask}>
                        <div className="quick-add-row"><span>+</span><input value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder={isPersonal ? "Add a personal task..." : `Add a task to ${selectedWorkspace.name}...`} disabled={isCreatingTask} /></div>
                        <textarea value={newDescription} onChange={(event) => setNewDescription(event.target.value)} placeholder="Description (optional)" disabled={isCreatingTask} rows="2" />
                        <div className="quick-add-controls">
                            <label>Status<select value={newStatus} onChange={(event) => setNewStatus(event.target.value)} disabled={isCreatingTask}><option value="pending">Pending</option><option value="in_progress">In progress</option><option value="completed">Completed</option></select></label>
                            <label>Priority<select value={newPriority} onChange={(event) => setNewPriority(event.target.value)} disabled={isCreatingTask}><option value="0">Low</option><option value="1">Medium</option><option value="2">High</option></select></label>
                            <button type="submit" disabled={isCreatingTask}>{isCreatingTask ? 'Saving...' : isPersonal ? 'Add personal task' : `Add to ${selectedWorkspace.name}`}</button>
                        </div>
                    </form>
                    {taskError && <p className="task-error" role="alert">{taskError}</p>}
                    <div className="task-list">{visibleTasks.map((task) => <article className={`task-row ${task.done ? 'is-done' : ''}`} key={`${task.workspaceId ?? 'personal'}-${task.id}`}><button className="task-check" onClick={() => toggleTask(task)} aria-label={`Mark ${task.title} ${task.done ? 'incomplete' : 'complete'}`}>{task.done ? '✓' : ''}</button><div className="task-title"><strong>{task.title}</strong><small><i className={`dot ${task.project === 'Personal' ? 'green' : task.project === 'Freelance' ? 'blue' : 'coral'}`} />{task.project}</small></div><span className="task-due">{task.due}</span><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span><button className="row-more" aria-label={`More options for ${task.title}`}>•••</button></article>)}{visibleTasks.length === 0 && <div className="empty-state">No tasks match this view.</div>}</div></section>
                </div>
            </main>
            {workspaceDialog && <div className="dialog-backdrop" role="presentation" onMouseDown={() => setWorkspaceDialog(null)}><section className="workspace-dialog" role="dialog" aria-modal="true" aria-labelledby="workspace-dialog-title" onMouseDown={(event) => event.stopPropagation()}><button className="dialog-close" onClick={() => setWorkspaceDialog(null)} aria-label="Close">×</button>{workspaceDialog === 'create' ? <><p className="eyebrow">Workspace</p><h2 id="workspace-dialog-title">Create a workspace</h2><p className="dialog-copy">Create a shared space for tasks and members.</p><form onSubmit={createWorkspace}><label>Workspace name<input value={workspaceName} onChange={(event) => setWorkspaceName(event.target.value)} placeholder="e.g. Marketing team" required /></label><label>Description <span>(optional)</span><textarea value={workspaceDescription} onChange={(event) => setWorkspaceDescription(event.target.value)} placeholder="What is this workspace for?" rows="3" /></label>{workspaceError && <p className="task-error" role="alert">{workspaceError}</p>}<button className="dialog-submit" type="submit">Create workspace</button></form></> : <><p className="eyebrow">{selectedWorkspace.name}</p><h2 id="workspace-dialog-title">Invite a member</h2><p className="dialog-copy">Add a member by username or email. Only workspace owners can do this.</p><form onSubmit={inviteMember}><label>Username or email<input value={memberUsernameOrEmail} onChange={(event) => setMemberUsernameOrEmail(event.target.value)} placeholder="name@example.com" required disabled={isInviting} /></label>{inviteError && <p className="task-error" role="alert">{inviteError}</p>}{inviteSuccess && <p className="invite-success" role="status">{inviteSuccess}</p>}<button className="dialog-submit" type="submit" disabled={isInviting}>{isInviting ? 'Inviting...' : 'Invite member'}</button></form></>}</section></div>}
        </div>
    );
}

export default Dashboard;