import './directory-item.scss';

export default function DirectoryItem ({ category }) {
  const { id, imageUrl, title } = category
  return (
    <div key={id} className="directory-item">
      <div className="background-image"
           style={{backgroundImage: `url(${imageUrl})`}}
      />
      <div className="directory-item-body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}