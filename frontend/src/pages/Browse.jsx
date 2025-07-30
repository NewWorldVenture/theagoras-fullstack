
import React, { useEffect, useState } from 'react';
import supabase from '../supabase';

export default function Browse() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    supabase.from('listings').select('*').then(({ data }) => setListings(data || []));
  }, []);

  return (
    <div>
      <h2>Marketplace Listings</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {listings.map(listing => (
          <div key={listing.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
            <img src={listing.image_url} alt="" width="100%" />
            <h4>{listing.title}</h4>
            <p>${listing.price}</p>
            <a href={`/profile/${listing.owner_id}`}>Seller Profile</a>
          </div>
        ))}
      </div>
    </div>
  );
}
