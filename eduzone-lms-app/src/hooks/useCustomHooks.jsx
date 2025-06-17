// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const UseFetch = (url, option = {}, dependencies = []) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isMounted = true;

//     setLoading(true);
//     setError(null);

//     axios(url, option)
//       .then((response) => {
//         if (isMounted) {
//           setData(response.data);
//           setLoading(false);
//         }
//       })
//       .catch((e) => {
//         if (isMounted) {
//           setError(e);
//           setLoading(false);
//         }
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, dependencies);

//   return {
//     data,
//     loading,
//     error,
//   };
// };

// export default UseFetch;

/*

import React from "react";
import UseFetch from "../Hooks/CustomHooks";

const UserList = () => {
  const { data, loading, error } = UseFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <>Loading...</>;
  if (error) return <>Error: {error.message}</>;
  return (
    <div>
      {data.map((data) => (
        <ul key={data.id}>
          <li>{data.name}</li>
          <li> {data.username}</li>
          <li> {data.email}</li>
        </ul>
      ))}
    </div>
  );
};

export default UserList;

*/
