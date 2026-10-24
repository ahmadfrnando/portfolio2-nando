import './admin.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase, IMAGE_BUCKET } from '../lib/supabase';

const emptyForm = { title: '', desc: '', link: '', stack: '', sort_order: 0, img: '' };

// Ambil path object dari public URL Supabase Storage; null kalau gambar bukan dari bucket (mis. /projects/xxx.webp).
const storagePath = (url) => {
  const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`;
  const i = url?.indexOf(marker) ?? -1;
  return i === -1 ? null : decodeURIComponent(url.slice(i + marker.length));
};

const uploadImage = async (file) => {
  const ext = file.name.split('.').pop().toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, {
    cacheControl: '31536000',
    contentType: file.type,
  });
  if (error) throw error;
  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
};

const removeImage = async (url) => {
  const path = storagePath(url);
  if (path) await supabase.storage.from(IMAGE_BUCKET).remove([path]);
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="admin-login">
      <form className="card" onSubmit={onSubmit}>
        <h1>Admin Login</h1>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
      </form>
    </div>
  );
};

const ProjectForm = ({ initial, onSaved, onCancel }) => {
  const [form, setForm] = useState(
    initial ? { ...initial, link: initial.link === '#' ? '' : initial.link, stack: (initial.stack ?? []).join(', ') } : emptyForm
  );
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const fileUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  const previewUrl = fileUrl ?? form.img;

  useEffect(() => () => fileUrl && URL.revokeObjectURL(fileUrl), [fileUrl]);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file && !form.img) return setError('Gambar wajib diisi.');
    setSaving(true);
    setError('');
    try {
      const img = file ? await uploadImage(file) : form.img;
      const payload = {
        title: form.title.trim(),
        desc: form.desc.trim(),
        link: form.link.trim() || '#',
        stack: form.stack.split(',').map((s) => s.trim()).filter(Boolean),
        sort_order: Number(form.sort_order) || 0,
        img,
      };
      const query = initial
        ? supabase.from('projects').update(payload).eq('id', initial.id)
        : supabase.from('projects').insert(payload);
      const { error } = await query;
      if (error) throw error;
      if (file && initial) await removeImage(initial.img);
      onSaved();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <form className="card project-form" onSubmit={onSubmit}>
      <h2>{initial ? 'Edit Project' : 'Tambah Project'}</h2>
      <label>
        Judul
        <input value={form.title} onChange={set('title')} required />
      </label>
      <label>
        Deskripsi
        <textarea rows={5} value={form.desc} onChange={set('desc')} required />
      </label>
      <label>
        Link demo <small>(kosongkan kalau tidak ada)</small>
        <input type="url" value={form.link} onChange={set('link')} placeholder="https://..." />
      </label>
      <label>
        Tech stack <small>(pisahkan dengan koma)</small>
        <input value={form.stack} onChange={set('stack')} placeholder="Laravel, React.js, MySQL" />
      </label>
      <label>
        Urutan <small>(angka kecil tampil duluan)</small>
        <input type="number" value={form.sort_order} onChange={set('sort_order')} />
      </label>
      <label>
        Gambar
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] ?? null)} />
      </label>
      {previewUrl && <img className="preview" src={previewUrl} alt="Preview" />}
      {error && <p className="error">{error}</p>}
      <div className="actions">
        <button type="submit" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</button>
        <button type="button" className="secondary" onClick={onCancel} disabled={saving}>Batal</button>
      </div>
    </form>
  );
};

const Dashboard = ({ session }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // null = list, 'new' = form tambah, object = form edit
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    if (error) setError(error.message);
    else setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onDelete = async (project) => {
    if (!window.confirm(`Hapus "${project.title}"?`)) return;
    const { error } = await supabase.from('projects').delete().eq('id', project.id);
    if (error) return setError(error.message);
    await removeImage(project.img);
    load();
  };

  const onSaved = () => {
    setEditing(null);
    load();
  };

  return (
    <div className="admin">
      <header>
        <h1>Portfolio Admin</h1>
        <div>
          <span className="email">{session.user.email}</span>
          <a href="/" target="_blank" rel="noopener noreferrer">Lihat site</a>
          <button className="secondary" onClick={() => supabase.auth.signOut()}>Logout</button>
        </div>
      </header>

      {error && <p className="error">{error}</p>}

      {editing ? (
        <ProjectForm initial={editing === 'new' ? null : editing} onSaved={onSaved} onCancel={() => setEditing(null)} />
      ) : (
        <>
          <div className="toolbar">
            <span>{projects.length} project</span>
            <button onClick={() => setEditing('new')}>+ Tambah Project</button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="project-list">
              {projects.map((p) => (
                <li key={p.id} className="card">
                  <img src={p.img} alt={p.title} />
                  <div className="info">
                    <h3>{p.title}</h3>
                    <p className="stack">{(p.stack ?? []).join(' · ')}</p>
                    <p className="meta">Urutan: {p.sort_order}</p>
                  </div>
                  <div className="actions">
                    <button onClick={() => setEditing(p)}>Edit</button>
                    <button className="danger" onClick={() => onDelete(p)}>Hapus</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

const Admin = () => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    document.title = 'Admin · Portfolio';
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return (
      <div className="admin">
        <p className="error">Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di .env.</p>
      </div>
    );
  }
  if (session === undefined) return null;
  return session ? <Dashboard session={session} /> : <Login />;
};

export default Admin;
