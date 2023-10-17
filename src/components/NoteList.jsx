import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, onDelete, onArchive }) {
  return notes.length > 0 ? (
    <div className='notes-list'>
      {notes.map((note) => (
        <NoteItem key={note.id} id={note.id} onDelete={onDelete} onArchive={onArchive} {...note} />
      ))}
    </div>
  ) : (
    <p className='notes-list__empty-message'>Tidak ada catatan</p>
  );
}

export default NoteList;

