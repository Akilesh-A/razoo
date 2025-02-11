
import "../homecategories/HomeCategory.css"
const HomeCategory = ({items}) => {
    return (
        <>
            <div className="hm-cat-wrapper">
                <img src={items.img} alt={items.imgCaption} className="w-100" />
                <div className="hm-cat-h-wrapper-body">
                    <p><strong>Lehengas</strong></p>
                   <button className="cat-cat-btn">Shop Now</button>
                </div>
            </div>
        </>
    )
}

export default HomeCategory
