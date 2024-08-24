import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import './RenderInvoice-page.scss';

const RenderInvoicePage = () => {
  const [htmlString, setHtmlString] = useState('');
  const { id_str } = useParams();
  // // Extract query parameters from the URL
  // const useQuery = () => {
  //   //const { search } = useLocation();
  //   //return React.useMemo(() => new URLSearchParams(search), [search]);
  //   const location = useLocation();
  //   console.log(location.search);
  //   return new URLSearchParams(useLocation().search);
  // };

  // const query = useQuery();
  // const id_str = query.get('id_str');


  useEffect(() => {

    const formatNumber = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    const fetchInvoice = async () => {
      try {
        console.log("hash is ",id_str);
        const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
        const response = await axios.get(`${process.env.REACT_APP_RYZ_SERVER}/get_invoice/`+id_str,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        });
        //   params: { id_str }
        // });
        setHtmlString(response.data.html);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };

    fetchInvoice();
  }, [id_str]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};

export default RenderInvoicePage;
