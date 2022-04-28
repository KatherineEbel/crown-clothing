import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import './checkout.styles.scss'

export default function Checkout () {
  const { items } = useContext(CartContext);

  const total = (() => {
    return items.reduce((acc, item) => {
      const { product, quantity} = item
      return acc + (product.price * quantity)
    }, 0)
  })()
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
        { items.map(({product, quantity}) => <CheckoutItem key={product.id} product={product} quantity={ quantity}/>)}
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