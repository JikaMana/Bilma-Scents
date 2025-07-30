// const renderAddProduct = () => (
//   <div className="space-y-6">
//     <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>

//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Product Name *
//             </label>
//             <input
//               type="text"
//               value={newProduct.name}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, name: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
//               placeholder="Enter product name"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Flavour *
//             </label>
//             <input
//               type="text"
//               value={newProduct.flavour}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, flavour: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
//               placeholder="e.g. Lemon"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Category *
//             </label>
//             <select
//               value={newProduct.category}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, category: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
//               required
//             >
//               <option value="">Select category</option>
//               <option value="Floral">Floral</option>
//               <option value="Fresh">Fresh</option>
//               <option value="Woody">Woody</option>
//               <option value="Oriental">Oriental</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Price *
//             </label>
//             <input
//               type="number"
//               step="0.01"
//               value={newProduct.price}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, price: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
//               placeholder="0.00"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Size *
//             </label>
//             <input
//               type="text"
//               value={newProduct.size}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, size: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
//               placeholder="e.g. 100ml"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Description
//           </label>
//           <textarea
//             value={newProduct.description}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, description: e.target.value })
//             }
//             rows={4}
//             className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
//             placeholder="Product description..."
//           />
//         </div>

//         {/* <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Image URL
//           </label>
//           <input
//             type="url"
//             value={newProduct.imageUrl}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, imageUrl: e.target.value })
//             }
//             className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
//             placeholder="https://example.com/image.jpg"
//           />
//         </div> */}

//         <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
//           <ImageUploadForm />

//           <div className="flex flex-col gap-6 w-full">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Top Notes
//               </label>
//               <input
//                 type="text"
//                 value={newProduct.topNotes}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, topNotes: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
//                 placeholder="e.g. Bergamot, Lemon"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Heart Notes
//               </label>
//               <input
//                 type="text"
//                 value={newProduct.heartNotes}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, heartNotes: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
//                 placeholder="e.g. Rose, Jasmine"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Base Notes
//               </label>
//               <input
//                 type="text"
//                 value={newProduct.baseNotes}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, baseNotes: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
//                 placeholder="e.g. Musk, Sandalwood"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="inStock"
//             checked={newProduct.inStock}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, inStock: e.target.checked })
//             }
//             className="accent-[#9c6a24] h-4 w-4 text-[#9c6a24] focus:ring-[#9c6a24] border-gray-300 rounded"
//           />
//           <label
//             htmlFor="inStock"
//             className="ml-2 block text-sm text-gray-900"
//           >
//             In Stock
//           </label>
//         </div>

//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={() => setActiveTab("products")}
//             className="px-6 py-2 border border-gray-300 outline-none text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={handleAddProduct}
//             className="px-6 py-2 bg-[#9c6a24] text-white rounded-lg cursor-pointer hover:opacity-70 transition-colors"
//           >
//             Add Product
//           </button>
//         </div>
//       </div>
//     </div>
//     <div className="flex flex-col">
//       <label>Rough sheet before adding products</label>
//       <textarea className="h-40 w-96 bg-gray-200 outline-none p-4"></textarea>
//     </div>
//   </div>
// );
