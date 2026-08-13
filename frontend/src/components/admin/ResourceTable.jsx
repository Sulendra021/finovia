import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Save } from "lucide-react";

// Generic admin CRUD table - takes a resource's API object (getAll/create/update/remove),
// a column set to display, and a form field schema to render create/edit modals.
// One component powers every admin product page (credit cards, loans, offers, etc.)
export default function ResourceTable({ title, api, columns, formFields, emptyLabel = "items" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = create mode, object = edit mode
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api
      .getAll()
      .then(setItems)
      .catch(() => setError("Couldn't reach the backend. Is it running and seeded?"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    const blank = {};
    formFields.forEach((f) => (blank[f.name] = f.type === "number" ? "" : ""));
    setForm(blank);
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    const filled = {};
    formFields.forEach((f) => {
      const val = item[f.name];
      filled[f.name] = f.type === "tags" ? (Array.isArray(val) ? val.join(", ") : "") : val ?? "";
    });
    setForm(filled);
    setEditing(item);
    setModalOpen(true);
  };

  const onChange = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form };
      formFields.forEach((f) => {
        if (f.type === "number") payload[f.name] = payload[f.name] === "" ? undefined : Number(payload[f.name]);
        if (f.type === "tags") payload[f.name] = String(payload[f.name] || "").split(",").map((s) => s.trim()).filter(Boolean);
      });
      if (editing) {
        await api.update(editing._id, payload);
      } else {
        await api.create(payload);
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (item) => {
    if (!window.confirm(`Delete "${item[columns[0].key]}"? This can't be undone.`)) return;
    try {
      await api.remove(item._id);
      load();
    } catch {
      setError("Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="fin-display text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
        <button onClick={openCreate} className="fin-focus flex items-center gap-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" /> Add new
        </button>
      </div>

      {error && <div className="mb-4 text-xs text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-lg px-3 py-2">{error}</div>}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-5 h-5 text-blue-600 animate-spin" /></div>
        ) : items.length === 0 ? (
          <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-16">No {emptyLabel} yet — click "Add new" to create one.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {columns.map((c) => <th key={c.key} className="text-left px-5 py-3">{c.label}</th>)}
                  <th className="text-right px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {items.map((item) => (
                  <tr key={item._id}>
                    {columns.map((c) => (
                      <td key={c.key} className="px-5 py-3 text-slate-700 dark:text-slate-200">
                        {Array.isArray(item[c.key]) ? item[c.key].join(", ") : String(item[c.key] ?? "")}
                      </td>
                    ))}
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <button onClick={() => openEdit(item)} className="fin-focus p-1.5 text-slate-500 hover:text-blue-600 inline-flex"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => onDelete(item)} className="fin-focus p-1.5 text-slate-500 hover:text-rose-600 inline-flex"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="fin-display font-bold text-slate-900 dark:text-white">{editing ? "Edit" : "Add"} {title.slice(0, -1)}</h3>
              <button onClick={() => setModalOpen(false)} className="fin-focus text-slate-400 hover:text-slate-700 dark:hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              {formFields.map((f) => (
                <div key={f.name}>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">{f.label}</label>
                  {f.type === "select" ? (
                    <select value={form[f.name] || ""} onChange={(e) => onChange(f.name, e.target.value)} required={f.required} className="fin-focus w-full mt-1.5 px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100">
                      <option value="" disabled>Select {f.label.toLowerCase()}</option>
                      {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea value={form[f.name] || ""} onChange={(e) => onChange(f.name, e.target.value)} required={f.required} rows={3} className="fin-focus w-full mt-1.5 px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100" />
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      step={f.type === "number" ? "0.1" : undefined}
                      value={form[f.name] || ""}
                      onChange={(e) => onChange(f.name, e.target.value)}
                      required={f.required}
                      placeholder={f.placeholder}
                      className="fin-focus w-full mt-1.5 px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100"
                    />
                  )}
                  {f.type === "tags" && <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Comma-separated</p>}
                </div>
              ))}
              <button type="submit" disabled={saving} className="fin-focus w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editing ? "Save changes" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
