import React from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Viewing profile for user ID: {id}</p>
    </div>
  );
}
