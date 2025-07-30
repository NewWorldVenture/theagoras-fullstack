import { useParams } from 'react-router-dom';

export default function ListingDetail() {
  const { id } = useParams();
  return (
    <div>
      <h2>Listing Detail</h2>
      <p>Showing details for listing ID: {id}</p>
    </div>
  );
}
