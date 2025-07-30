import React from "react";
export default function CreateListing() {
  return (
    <div>
      <h1>Create New Listing</h1>
      <form>
        <input type="text" placeholder="Title" /><br />
        <textarea placeholder="Description" /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
