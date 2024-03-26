import { RouterProvider } from "react-router-dom";
import Router from "./router/Routes";




const App = () => {
  return (
    <>

      <RouterProvider router={Router}/>
      
    </>
  );
};

export default App;
