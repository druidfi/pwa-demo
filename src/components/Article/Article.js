import React from 'react';

export function Article({ item }) {
  return (
    <li>
      <a href={item.link}>{item.title}</a>

      <blockquote>
        <small>{item.date}, {item.category}</small>
      </blockquote>

      <blockquote>
        {item.description}
      </blockquote>
    </li>
  );
}
