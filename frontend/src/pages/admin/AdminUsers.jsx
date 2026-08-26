import React, { useEffect, useState } from "react";
import { Loader2, ShieldCheck, Trash2 } from "lucide-react";
import { usersApi } from "../../services/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    usersApi.getAll().then(setUsers).catch(() => setError("Couldn't reach the backend.")).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleRole = async (u) => {
    const nextRole = u.role === "admin" ? "user" : "admin";
    await usersApi.updateRole(u._id, nextRole);
    load();
  };

  const remove = async (u) => {
    if (!window.confirm(`Delete user "${u.name}"?`)) return;
    await usersApi.remove(u._id);
    load();
  };

  return (
    <div>
      <h2 className="fin-display text-lg font-bold text-slate-900 dark:text-white mb-5">Users</h2>
      {error && <div className="mb-4 text-xs text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-lg px-3 py-2">{error}</div>}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-5 h-5 text-blue-600 animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto fin-scrollbar-y">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  <th className="px-5 py-3 whitespace-nowrap">Name</th>
                  <th className="px-5 py-3 whitespace-nowrap">Email</th>
                  <th className="px-5 py-3 whitespace-nowrap">Role</th>
                  <th className="text-right px-5 py-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">{u.name}</td>
                    <td className="px-5 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">{u.email}</td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${u.role === "admin" ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <button onClick={() => toggleRole(u)} title="Toggle admin" className="fin-focus p-1.5 text-slate-500 hover:text-blue-600 inline-flex"><ShieldCheck className="w-4 h-4" /></button>
                      <button
                        onClick={() => remove(u)}
                        disabled={u._id === currentUser?._id}
                        title={u._id === currentUser?._id ? "Can't delete yourself" : "Delete"}
                        className="fin-focus p-1.5 text-slate-500 hover:text-rose-600 disabled:opacity-30 inline-flex"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
