import React, { useState } from 'react';

function NoteInput({ addNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const charLimit = 50;

  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value.slice(0, charLimit));
  };

  const onBodyChangeHandler = (event) => {
    setBody(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addNote({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <div className='note-input'>
      <h2>Input Catatan</h2>
      <form onSubmit={onSubmitHandler}>
        <p className='note-input__title__char-limit'>Sisa Karakter: {charLimit - title.length}</p>
        <input
          type='text'
          className='note-input__title'
          placeholder='Ini adalah judul ...'
          required
          value={title}
          onChange={onTitleChangeHandler}
        />
        <textarea
          className='note-input__body'
          type='text'
          placeholder='Tuliskan catatanmu di sini ...'
          required
          value={body}
          onChange={onBodyChangeHandler}
        ></textarea>
        <button type='submit'>Buat</button>
      </form>
    </div>
  );
}

export default NoteInput;
