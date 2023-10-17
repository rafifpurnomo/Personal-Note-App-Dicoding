import React, { useState } from 'react';
import { getInitialData } from '../utils';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import NoteSearch from './NoteSearch';
import NoteInput from './NoteInput';
import NoteList from './NoteList';

function NoteApp() {
  const [notes, setNotes] = useState(getInitialData());
  const [searching, setSearching] = useState('');
  const [titleNote, setTitleNote] = useState('');

  const onDeleteNoteHandler = (id) => {
    const titleNote = notes.find((note) => note.id === id).title;
    const updatedNotes = notes.filter((note) => note.id !== id);
    confirmAlert({
      message: `Anda yakin ingin menghapus catatan ${titleNote}?`,
      buttons: [
        {
          label: 'Ya',
          onClick: () => setNotes(updatedNotes),
        },
        {
          label: 'Tidak',
        },
      ],
    });
  };

  const onArchiveNoteHandler = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    setNotes(updatedNotes);
  };

  const onAddNoteHandler = ({ title, body }) => {
    const currentDate = new Date().toISOString();
    const newNote = {
      id: +new Date(),
      title,
      body,
      createdAt: currentDate,
      archived: false,
    };
    setNotes([...notes, newNote]);
  };

  const onSearchingNoteHandler = (event) => {
    setSearching(event.target.value);
  };

  const search = notes.filter((note) =>
    note.title.toLowerCase().includes(searching.toLowerCase())
  );
  const active = search.filter((note) => !note.archived);
  const archive = search.filter((note) => note.archived);

  return (
    <>
      <div className='note-app__header'>
        <h1>Notes</h1>
        <NoteSearch onSearch={onSearchingNoteHandler} />
      </div>
      <div className='note-app__body'>
        <NoteInput addNote={onAddNoteHandler} />
        <h2>Catatan Aktif</h2>
        <hr />
        <br />
        <NoteList notes={active} onDelete={onDeleteNoteHandler} onArchive={onArchiveNoteHandler} />
        <h2>Arsip Catatan</h2>
        <hr />
        <br />
        <NoteList notes={archive} onDelete={onDeleteNoteHandler} onArchive={onArchiveNoteHandler} />
      </div>
    </>
  );
}

export default NoteApp;
