export const ItemOfRestaurant = ({ item }) => {
    return (
        <div>
            <h4>{item.name}</h4>
            <p>{item.price} $</p>
            <button onClick={() => console.log('add to cart')}>Add to cart</button>
        </div>
    )
};
