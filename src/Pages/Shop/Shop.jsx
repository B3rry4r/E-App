import React from 'react';
import './Shop.scss';
import SHOP_DATA from '../../Components/Data/ShopData';
import CollectionPreview from '../../Components/CollectionPreview/CollectionPreview';

class Shop extends React.Component {
    constructor() {
        super();

        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        const {collections} = this.state
        return (
        <div className='shop'>
            {
                collections.map(({ id, ...otherCollectionProps }) => (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                ))
            }
        </div>
        )
    }
}

export default Shop;