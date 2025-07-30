import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';

export default function SellerStorefront() {
  const { sellerId } = useParams();
  const [seller, setSeller] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchSellerAndListings() {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sellerId)
        .single();

      const { data: sellerListings, error: listingsError } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', sellerId);

      if (!profileError) setSeller(profile);
      if (!listingsError) setListings(sellerListings);
    }

    fetchSellerAndListings();
  }, [sellerId]);

  return (
    <div>
      {seller ? (
        <>
          <h2>{seller.username || seller.email}'s Storefront</h2>
          <p>{seller.bio}</p>
          <h3>Listings</h3>
          <ul>
            {listings.map(listing => (
              <li key={listing.id}>
                <strong>{listing.title}</strong>: {listing.description}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading seller profile...</p>
      )}
    </div>
  );
}
