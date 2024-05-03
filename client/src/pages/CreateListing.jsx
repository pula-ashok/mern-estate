import React from "react";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form action="" className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Name"
            id="name"
            required
            minLength={10}
            maxLength={62}
          />
          <textarea
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Description"
            id="description"
            required
          />
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Address"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={1}
                max={10}
                id="beds"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={1}
                max={10}
                className="p-3 rounded-lg border border-gray-300"
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={50}
                max={10000}
                step={50}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span>($ / month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={50}
                max={10000}
                step={50}
                className="border border-gray-300 p-3 rounded-lg"
              />
              <div className="flex  items-center flex-col">
                <p>Discount price</p>
                <span>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will cover(max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded w-full "
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-md disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
