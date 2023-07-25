import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Table({ type, tableHeader, urlAPI }) {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(urlAPI)
      .then((res) => res.json())
      .then((dataAPI) => {
        setTableData(dataAPI);
      });
  }, [urlAPI]);

  const onCreate = () => {
    navigate(`${type}/create`)
  }

  const onDetails = (id) => {
    navigate(`${type}/${id}`);
  };

  const onEdit = (id) => {
    navigate(`${type}/${id}/edit`);
  };

  const onRemove = (id) => {
    setTableData(tableData.filter((item) => item.id !== id));
  };

  // Omitir los primeros 4 elementos del array tableData para usuarios
  const userTableData = type === '/users' ? tableData.slice(3) : tableData;
  const titleCreate = type === '/users' ? 'Create User' : 'Create Product';

  return (

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-24 py-24">
         {/* Botón Create */}

        <button
            onClick={onCreate}
            className="absolute top-0 right-1/4 mt-4 mr-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5"
        >
        {titleCreate}
        </button>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            {tableHeader.map((header) => (
              <th scope="col" className="px-6 py-3" key={header}>
                {header.toUpperCase()}
              </th>
            ))}
            <th scope="col" className="px-6 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {userTableData ? (
            userTableData.map((item) => (
              <tr className="bg-white border-b dark:border-gray-700" key={item.id}>
                {tableHeader.map((name) => {
                  if (['avatar', 'images'].includes(name)) {
                    const image = Array.isArray(item?.[name]) ? item?.[name]?.[0] : `https://avatars.dicebear.com/api/croodles/${Math.floor((Math.random() * 10000000) + 1)}.svg`;

                    return (
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap " key={name}>
                        <img className="w-10 h-10 rounded-full" alt={item.title} src={image}></img>
                      </th>
                    );
                  }

                  if ('updatedAt' === name) {
                    return (
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap " key={name}>
                        {new Date(item?.[name]).toLocaleString()}
                      </th>
                    );
                  }

                  return (
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap " key={name}>
                      {item?.[name]}
                    </th>
                  );
                })}
                <td className="px-6 py-4">
                  <button onClick={() => onDetails(item.id)} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    Details
                  </button>
                  <button onClick={() => onEdit(item.id)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Edit
                  </button>
                  <button onClick={() => onRemove(item.id)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeader.length + 1}>{type.toUpperCase()} NOT FOUND</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
