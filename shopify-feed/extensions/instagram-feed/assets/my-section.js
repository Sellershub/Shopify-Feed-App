import React from 'react';
// import { useAppBridge } from '@shopify/app-bridge-react';
// import { Card } from '@shopify/polaris';

function MySection({ myProp }) {
//   const app = useAppBridge();

  // Use the App Bridge instance to fetch data from the Shopify API
  const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     app.api().fetch('/api/my-data')
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error(error));
//   }, [app]);

  // Render the section using the data fetched from the API
  return (
    // <Card>
      <p>{myProp}</p>
      
    // </Card>
  );
}

export default MySection;