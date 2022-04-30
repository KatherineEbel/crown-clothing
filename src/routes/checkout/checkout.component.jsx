import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import './checkout.styles.scss'
import {useSelector} from "react-redux";
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";

export default function Checkout () {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return items.length ? (
    <main className='checkout'>
      <table>
        <thead>
        <tr className='heading'>
          <th>Product</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Remove</th>
        </tr>
        </thead>
        <tbody>
        { items.map((product) => <CheckoutItem key={product.id} product={product}/>)}
        </tbody>
        <tfoot>
        <tr>
          <td>
            Total: ${total}
          </td>
        </tr>
        </tfoot>
      </table>

    </main>
  ) : (
    <main>
      <h1>No items in cart.</h1>
    </main>
  )
}