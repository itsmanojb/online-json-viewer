import style from './components.module.css';

const AllToolList = ({ selected, onToolChange }) => {
  const tools = [
    {
      id: 1,
      name: 'JSON Viewer',
      code: 'json',
    },
    {
      id: 2,
      name: 'URL Encoder',
      code: 'url-e',
    },
    {
      id: 3,
      name: 'URL Decoder',
      code: 'url-d',
    },
    {
      id: 4,
      name: 'Base64 Encoder',
      code: 'base64-e',
    },
    {
      id: 5,
      name: 'Base64 Decoder',
      code: 'base64-d',
    },
  ];
  return (
    <div className={style.sidebar}>
      <h3>Available Tools</h3>
      <ul className={style.menuList}>
        {tools.map((tool) => (
          <li
            className={`${selected === tool.code && style.selected}`}
            key={tool.id}
            onClick={() => onToolChange(tool.code)}
          >
            {tool.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllToolList;
