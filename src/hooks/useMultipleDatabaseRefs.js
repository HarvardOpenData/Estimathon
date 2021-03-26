import { useEffect, useState } from "react";

import app from "../firebase";

function useMultipleDatabaseRefs(paths) {
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues({});
    const refs = {};
    const updates = {};
    for (const path of paths) {
      updates[path] = (snapshot) => {
        setValues((values) => ({ ...values, [path]: snapshot.val() }));
      };
      refs[path] = app.database().ref(path);
      refs[path].on("value", updates[path]);
    }
    return () => {
      for (const path of paths) {
        refs[path].off("value", updates[path]);
      }
    };
  }, [paths]);

  if (Object.keys(values).length < paths.length) {
    return [null, true];
  }
  return [paths.map((path) => values[path]), false];
}

export default useMultipleDatabaseRefs;
