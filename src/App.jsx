import { useState } from "react";
import Image from "./assets/images/image-1.webp";
import Image1 from "./assets/images/image-2.webp";
import Image2 from "./assets/images/image-3.webp";
import Image3 from "./assets/images/image-4.webp";
import Image4 from "./assets/images/image-5.webp";
import Image5 from "./assets/images/image-6.webp";
import Image6 from "./assets/images/image-7.webp";
import Image7 from "./assets/images/image-8.webp";
import Image8 from "./assets/images/image-10.jpeg";
import Image9 from "./assets/images/image-11.jpeg";
import { GrGallery } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
export default function App() {
  const [items, setItems] = useState([
    Image,
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9,
  ]);
  // State to handle the item being dragged
  const [draggedItem, setDraggedItem] = useState(null);

  // State to manage selected items for deletion
  const [selectedItems, setSelectedItems] = useState([]);

  // Function triggered when a draggable item starts being dragged
  const handleDragStart = (e, index) => {
    setDraggedItem(index);
  };

  // Function triggered when a dragged item is over another item
  const handleDragOver = (index) => {
    if (draggedItem === null || draggedItem === index) {
      return;
    }
    // Reordering the items during drag and drop
    const itemsCopy = Array.from(items);
    const item = itemsCopy[draggedItem];
    itemsCopy.splice(draggedItem, 1);
    itemsCopy.splice(index, 0, item);
    setItems(itemsCopy);
    setDraggedItem(index);
  };

  // Function to handle the checkbox selection for multiple files
  const handleCheck = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  // Function to  deselected items
  const handleDeSelect = () => {
    setSelectedItems([]);
  };
  // Function to delete selected items
  const handleDelete = () => {
    const remainingItems = items.filter(
      (_, index) => !selectedItems.includes(index)
    );
    setItems(remainingItems);
    setSelectedItems([]);
  };

  // Function for handling the file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    // Reading each uploaded file and adding it to the list of items
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setItems((prevItems) => [...prevItems, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <div className="lg:w-[80vw] md:w-[90vw] max-w-[1441px] bg-white mt-5 shadow-lg h-max m-auto rounded-2xl px-10 py-2">
      <div className="header   my-1  px-5 bg-orange-200 flex justify-between  py-2">
        {selectedItems.length > 0 ? (
          <>
            {" "}
            <div className="select flex items-center gap-2">
              <input
                className={`w-4 h-4 `}
                type="checkbox"
                checked={selectedItems.length > 0 ? "checked" : ""}
              />
              <label
                className={`text-sm font-bold text-blue-500 ${
                  selectedItems.length > 0 ? "text-blue-500" : "text-gray-600"
                }`}
                htmlFor=""
              >
                {selectedItems.length ? selectedItems.length : 0} Files selected
              </label>
              {selectedItems.length > 0 && (
                <button
                  onClick={handleDeSelect}
                  className={`text-sm flex justify-center items-center  font-bold text-red-500 p-1 border border-gray-200 rounded-md hover:bg-orange-300  transition-all duration-500 ease-in-out`}
                  htmlFor=""
                >
                  <MdCancel size={16} />
                </button>
              )}
            </div>
            <div className="delete">
              <button
                type="button"
                onClick={handleDelete}
                className={`text-sm lowercase font-bold border ${
                  selectedItems.length > 0
                    ? "text-red-600 hover:text-red-600"
                    : "text-gray-500 hover:text-white "
                } px-4 py-2 flex gap-2 justify-center items-center rounded-md hover:bg-orange-300  transition-all duration-500 ease-in-out`}
              >
                <AiTwotoneDelete /> Delete files
              </button>
            </div>
          </>
        ) : (
          <h1 className="text-xl my-1 flex justify-center items-center gap-2 font-bold">
            <GrGallery />
            Gallery
          </h1>
        )}
      </div>
      <div className="imageGallery  gap-5  py-5 lg:gap-5 md:gap-5  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item, index) => {
          return (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={() => handleDragOver(index)}
              className={`card cursor-pointer bg-white rounded-2xl border-2 group overflow-hidden z-0 relative transition-all duration-500 ease-in-out ${
                index === 0
                  ? "col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 md:row-span-2 lg:row-span-2 xl:row-span-2 "
                  : "h-52 min-h-[250px] min-w-[100%] lg:h-full md:h-full xl:h-full flex justify-center items-center"
              }`}
            >
              {/* //========================= image */}
              <img
                className="w-auto h-full p-3  rounded-3xl md:rounded-none lg:rounded-none md:p-0 lg:p-0  object-cover"
                src={item}
                alt="img"
              />
              {/* //============================checkbox  */}
              <div className="input absolute left-5 z-50 top-5 ">
                <input
                  type="checkbox"
                  onChange={() => handleCheck(index)}
                  checked={selectedItems.includes(index)}
                  className="w-4 cursor-pointer h-4 opacity-0 checked:opacity-100 group-hover:opacity-100 transition-all ease-in-out duration-500"
                />
              </div>
              {/* //========================hover bg */}
              <div className="input top-0 transition-all ease-in-out duration-500 left-0 w-full bg-gray-500 bg-opacity-70 opacity-0 group-hover:opacity-100 h-full absolute  z-40  "></div>
            </div>
          );
        })}
        {/* //========================photo upload button  */}
        <div className="card   overflow-hidden z-0 relative transition-all duration-500 ease-in-out  hover:bg-gray-300 rounded-xl">
          <label
            htmlFor="uploadGallery"
            className=" flex flex-col border-[3px]  w-full h-52 gap-3 cursor-pointer  border-dotted border-spacing-10 border-gray-300 md:min-w-full md:min-h-full lg:min-w-full lg:min-h-full  justify-center items-center"
          >
            <GrGallery size={30} />
            <span className="text-md font-bold">Add photos</span>
          </label>
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            multiple
            id="uploadGallery"
          />
        </div>
      </div>
    </div>
  );
}
