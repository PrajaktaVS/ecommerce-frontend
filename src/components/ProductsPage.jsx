import { useEffect, useState } from "react";
import "./ProductsPage.css";
import { SearchBar } from "./SearchBar";
import { useAuth } from "../store/auth";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";


export const ProductsPage = ({ categoryId = null, title = "All Products" }) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [sortOption, setSortOption] = useState("");
    const { isLoggedIn } = useAuth();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = categoryId
                    ? `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
                    : `https://api.escuelajs.co/api/v1/products`;

                const response = await fetch(url);
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryId]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const updateCart = (selectedProduct, quantityChange) => {
        if (!isLoggedIn) {
            toast.warning("Please login or register");
            return;
        }

        let updatedCart = [...cart];
        const existingProduct = updatedCart.find((cartProduct) => cartProduct.id === selectedProduct.id);

        if (existingProduct) {
            existingProduct.quantity += quantityChange;

            if (existingProduct.quantity <= 0) {
                updatedCart = updatedCart.filter(item => item.id !== selectedProduct.id);
                toast.info("Item removed from cart");
            }else{
                toast.success("Quantity updated");
            }
        } else {
            updatedCart.push({ ...selectedProduct, quantity: 1 });
            toast.success("Item added to cart");
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const getProductCount = (productId) => {
        return cart.find((item) => item.id === productId)?.quantity || 0;
    };


    const filteredProducts = products
        .filter(({ title, category }) => title.toLowerCase().includes(searchTerm.toLowerCase()) || category?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            switch (sortOption) {
                case "priceLowHigh":
                    return a.price - b.price;
                case "priceHighLow":
                    return b.price - a.price;
                case "newest":
                    return b.id - a.id;
                default:
                    return 0;
            }
        });


    return (
        <div className="products-page">
            <h2 className="searchTitle">{title}</h2>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {
                loading ? (
                    <p>Loading products...</p>
                ) : filteredProducts.length === 0 ? (
                    <p> No items in this category.</p>
                ) : (
                    <>
                        <div className="sort-container">
                            <label htmlFor="sort">Sort by: </label>
                            <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="priceLowHigh">Price: Low to High</option>
                                <option value="priceHighLow">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>

                        <div className="product-grid">

                            {
                                filteredProducts.map((product) => {
                                    const count = getProductCount(product.id);

                                    return (
                                        <div
                                            className="product-card"
                                            key={product.id}
                                            onClick={() => handleShowModal(product)}>

                                            <img src={product.images[0] || "/images/no-photos.png"} alt={product.title}
                                                onError={(e) => {
                                                    e.target.onError = null;
                                                    e.target.src = "/images/no-photos.png";
                                                    e.target.style.objectFit = "contain";
                                                    e.target.style.backgroundColor = "#DDDDDD";
                                                }} />
                                            <h3>{product.title}</h3>
                                            <p>${product.price}</p>
                                            <p>{product.category?.name || "No Category"}</p>

                                            {count > 0 ? (
                                                <div
                                                    onClick={(e) => e.stopPropagation()}>
                                                    <button
                                                        className="btn"
                                                        onClick={() => updateCart(product, -1)}>
                                                        <FaMinus />
                                                    </button>
                                                    <span>{count}</span>
                                                    <button
                                                        className="btn"
                                                        onClick={() => updateCart(product, 1)}>
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    className="btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateCart(product, 1)
                                                    }}>
                                                    Add
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            <Modal show={showModal} onHide={handleCloseModal} centered>
                                <div className="modal-content">
                                    <Modal.Header closeButton>
                                        <Modal.Title className="modal-title">{selectedProduct?.title}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="modal-body">
                                        <img src={selectedProduct?.images[0] || "/images/no-photos.png"}
                                            alt={selectedProduct?.title}
                                            onError={(e) => {
                                                e.target.onError = null;
                                                e.target.src = "/images/no-photos.png";
                                            }} />
                                        <p><strong>Price:</strong> ${selectedProduct?.price}</p>
                                        <p><strong>Category:</strong> {selectedProduct?.category?.name}</p>
                                        <p>{selectedProduct?.description}</p>
                                    </Modal.Body>
                                </div>
                            </Modal>
                        </div>
                    </>
                )
            }

        </div >

    )
}