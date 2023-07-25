import { useEffect, useState } from "react";
import "./PlansScreen.css";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/counter/userSlice";
import { loadStripe } from "@stripe/stripe-js";

const PlansScreen = () => {
  const [products, setProducts] = useState([]); // State to store the fetched products
  const user = useSelector(selectUser); // Get the user from Redux store

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "products"), // Get the "products" collection from Firestore
          where("active", "==", true) // Query for active products only
        );
        const querySnapshot = await getDocs(q); // Execute the query and get the snapshot of the results
        const productsData = {}; // Temporary object to store the products

        // Loop through each product document in the snapshot
        querySnapshot.forEach(async (productDoc) => {
          productsData[productDoc.id] = productDoc.data(); // Store the product data in the temporary object

          const priceSnap = await getDocs(
            collection(db, "products", productDoc.id, "prices") // Get the "prices" subcollection of the current product
          );

          // Loop through each price document in the subcollection
          priceSnap.docs.forEach((price) => {
            productsData[productDoc.id].prices = {
              priceId: price.id, // Store the price ID
              priceData: price.data(), // Store the price data
            };
          });
        }, []);

        setProducts(productsData); // Set the fetched products in the state
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts(); // Call the fetchProducts function when the component mounts
  }, []);

  console.log(products); // Log the fetched products to the console

  const loadCheckout = async (priceId) => {
    const docRef = doc(db, "customers", user.uid, "checkout_sessions", priceId); // Reference to the checkout session document in Firestore

    await setDoc(docRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }); // Set the data for the checkout session document

    const snap = await getDoc(docRef); // Get the snapshot of the checkout session document
    const { error, sessionId } = snap.data(); // Extract the error and sessionId fields from the document data

    if (error) {
      alert(`An error occurred: ${error.message}`); // Display an alert if there is an error
    }
    if (sessionId) {
      const stripe = await loadStripe(
        "pk_test_51NMgH6IkVI65hvhhu7rjmbVRRRljOzVB5D7jLxXHnNOUQ2IyKNLvqZGyjlY6SCXycVVkqr7rupKB6KDfMmcfEEDD00wInX563b"
      ); // Load the Stripe library
      stripe.redirectToCheckout({ sessionId }); // Redirect the user to the checkout page using the sessionId
    }
  };

  return (
    <div className="plansScreen">
      {/* Loop through each product in the products object */}
      {Object.entries(products).map(([productId, productData]) => {
        return (
          <div key={productId} className="plansScreen_plan">
            <div className="plansScreen_info">
              <h5>{productData.name}</h5>
              <p>{productData.description}</p>
            </div>
            <button
              type="submit"
              onClick={() => loadCheckout(productData.prices.priceId)} // Call the loadCheckout function when the button is clicked
            >
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansScreen;
