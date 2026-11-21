// "What I'm learning" checklist, built with React state (Week 12).
// Written with React.createElement instead of JSX, so the page needs no build step or Babel.
const { useState, createElement: h } = React;

const TOPICS = [
  { id: 'html-css', label: 'Semantic HTML & responsive CSS', done: true },
  { id: 'js-dom', label: 'JavaScript, the DOM & events', done: true },
  { id: 'fetch', label: 'Fetch API & async/await', done: true },
  { id: 'git', label: 'Git, GitHub & GitHub Pages', done: true },
  { id: 'props', label: 'React components & props', done: true },
  { id: 'state', label: 'React state with useState', done: true },
  { id: 'effect', label: 'useEffect & data fetching', done: false },
  { id: 'router', label: 'React Router', done: false },
  { id: 'backend', label: 'A backend with Node.js', done: false },
];

// Reads the counts through props: it never owns any state
function Progress({ done, total }) {
  return h('div', { className: 'tracker-progress' },
    h('p', { id: 'tracker-status', 'aria-live': 'polite' }, `${done} of ${total} topics done`),
    h('progress', { max: total, value: done, 'aria-labelledby': 'tracker-status' })
  );
}

// Sends changes up through onToggle
function Checklist({ topics, onToggle }) {
  return h('ul', { className: 'tracker-list' },
    topics.map((topic) =>
      h('li', { key: topic.id },
        h('label', null,
          h('input', { type: 'checkbox', checked: topic.done, onChange: () => onToggle(topic.id) }),
          ' ', topic.label
        )
      )
    )
  );
}

function NoteBox({ note, onChange }) {
  const words = note.trim() ? note.trim().split(/\s+/).length : 0;
  return h('div', { className: 'tracker-note' },
    h('label', { htmlFor: 'tracker-note' }, 'What I want to learn next'),
    h('textarea', { id: 'tracker-note', rows: 3, value: note, onChange: (e) => onChange(e.target.value) }),
    h('p', { className: 'word-count' }, `${words} ${words === 1 ? 'word' : 'words'}`)
  );
}

// Owns the state, so Progress and Checklist always agree
function LearningTracker() {
  const [topics, setTopics] = useState(TOPICS);
  const [note, setNote] = useState('');

  const toggle = (id) =>
    setTopics((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const done = topics.filter((t) => t.done).length;   // derived, not stored

  return h(React.Fragment, null,
    h(Progress, { done, total: topics.length }),
    h(Checklist, { topics, onToggle: toggle }),
    h(NoteBox, { note, onChange: setNote })
  );
}

ReactDOM.createRoot(document.getElementById('learning-tracker')).render(h(LearningTracker));
