import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/Navbar';
import { adminAPI } from '../../api';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [markingAll, setMarkingAll] = useState(false);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const fetchNotifications = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await adminAPI.getNotifications({ limit: 100, offset: 0 });
      setNotifications(data.notifications || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markRead = async (id) => {
    try {
      await adminAPI.markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true, readAt: new Date().toISOString() } : n))
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark notification read');
    }
  };

  const markAllRead = async () => {
    setMarkingAll(true);
    setError('');
    try {
      await adminAPI.markAllNotificationsRead();
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true, readAt: n.readAt || new Date().toISOString() }))
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark all as read');
    } finally {
      setMarkingAll(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return '';
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="admin-notifications">
          <div className="notifications-header">
            <div>
              <h1>Notifications</h1>
              <p className="notifications-subtitle">
                {loading ? 'Loading...' : unreadCount === 0 ? 'No unread notifications' : `${unreadCount} unread`}
              </p>
            </div>

            <div className="notifications-actions">
              <button
                className="btn btn-secondary"
                onClick={fetchNotifications}
                disabled={loading}
              >
                Refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={markAllRead}
                disabled={loading || markingAll || unreadCount === 0}
              >
                {markingAll ? 'Marking...' : 'Mark all as read'}
              </button>
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {loading ? (
            <div className="empty-state">
              <p>Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="empty-state">
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="notifications-list">
              {notifications.map((n) => (
                <div key={n.id} className={`notification-card ${n.isRead ? 'read' : 'unread'}`}>
                  <div className="notification-main">
                    <div className="notification-title-row">
                      <h3 className="notification-title">{n.title}</h3>
                      {!n.isRead && <span className="notification-dot" aria-label="Unread" />}
                    </div>
                    <p className="notification-message">{n.message}</p>
                    <div className="notification-meta">
                      <span>{formatDate(n.createdAt)}</span>
                      {n.orderId ? <span className="notification-meta-sep">•</span> : null}
                      {n.orderId ? <span>Order #{n.orderId}</span> : null}
                    </div>
                  </div>

                  <div className="notification-actions">
                    {!n.isRead ? (
                      <button className="btn btn-secondary" onClick={() => markRead(n.id)}>
                        Mark read
                      </button>
                    ) : (
                      <span className="read-label">Read</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;

