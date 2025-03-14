import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [query,setquery] = useState({
    searchTerm : '',
    type: 'all',
    offer:false,
    parking: false,
    furnished:false,
    sort: "createdAt",
    order : "desc"
  });
  const [listings,setListings] = useState([]);
  const [listStatus,setListStatus] = useState({loading:false,error : ""});
  const [showMore,setShowMore] = useState({status:false,listings:[]});
  const handleChange = (e)=>{
    if(e.target.id === "searchTerm"){
      setquery({...query,searchTerm:e.target.value});
    }
    else if(e.target.id === "all" || e.target.id === "sale" || e.target.id === "rent"){
      setquery({...query,type:e.target.id});
    }
    else if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer"){
      setquery({...query,[e.target.id]:!query[e.target.id]});
    }
    else if(e.target.id === "sort_order"){
      const order = e.target.value.split("_");
      setquery({...query,sort:order[0],order: order[1]});
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm",query.searchTerm); 
    urlParams.set("type",query.type);
    urlParams.set("offer",query.offer);
    urlParams.set("parking",query.parking);
    urlParams.set("furnished",query.furnished);
    urlParams.set("sort",query.sort);
    urlParams.set("order",query.order);
    const searchQuery = urlParams.toString();
    console.log(searchQuery)
    navigate(`/search?${searchQuery}`);
  }
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("searchTerm") || "";
    const type = urlParams.get("type") || "all";
    const offer = urlParams.get("offer")=== "true"?true:false;
    const parking = urlParams.get("parking")=== "true"?true:false;
    const furnished = urlParams.get("furnished")=== "true"?true:false;
    const sort = urlParams.get("sort") || "createdAt";
    const order = urlParams.get("order") || "desc";
    if(searchTerm || type || offer || parking || furnished || sort || order){
      setquery({
        searchTerm: searchTerm ,
        type: type ,
        parking: parking ,
        offer:offer ,
        furnished: furnished ,
        sort: sort ,
        order: order 
      });
    }
    const fetchListing = async ()=>{
      try{
        setListStatus({loading:true,error:""});
        const res = await fetch(`/api/listening/get?${urlParams.toString()}`);
        const data = await res.json();
        if(data.success === false){
          setListStatus({loading:false,error:data.message});
          return ;
        }
        if(data.length > 9){
          setShowMore({status:true,listings:data.splice(9)});
        }
        setListings(data);
        setListStatus({loading:false,error:""});
      }catch(error){
        console.log(error);
        setListStatus({loading:false,error:error.message});
      }
    }
    fetchListing();
  },[window.location.search])
  return (
    <div className='flex flex-col md:flex-row gap-5'>
      <div className='border-b-4 md:min-w-[380px]  md:border-r-4 md:border-b-0 md:w-1/3 md:min-h-screen' >
       <form onSubmit={handleSubmit} className='flex flex-col m-5 gap-5 mb-5'>
        <fieldset className='flex gap-5 items-center'>
          <label htmlFor="search" className='text-nowrap font-semibold'>Search Term: </label>
          <input type="text" id='searchTerm' placeholder='Search...' className='p-1 rounded-md capitalize border focus:outline-none w-full' value={query.searchTerm} onChange={handleChange} />
        </fieldset>
        <div className='flex gap-5 m flex-wrap items-center'>
            <label htmlFor="type" className='font-semibold'>Type: </label>
            <fieldset className='flex gap-2'>
              <input type="checkbox" id='all' className='w-5' onChange={handleChange} checked={query.type === "all"}  />
              <label htmlFor="all">Sale & Rent</label>
            </fieldset>
            <fieldset className='flex gap-2'>
              <input type="checkbox" id='sale' className='w-5' onChange={handleChange} checked={query.type === "sale"} />
              <label htmlFor="sale">Sale</label>
            </fieldset>
            <fieldset className='flex gap-2'>
              <input type="checkbox" id='rent' className='w-5' onChange={handleChange} checked={query.type === "rent"} />
              <label htmlFor="rent">Rent</label>
            </fieldset>
            <fieldset className='flex gap-2'>
              <input type="checkbox" id='offer' className='w-5' checked={query.offer} onChange={handleChange} />
              <label htmlFor="offer">Offer</label>
            </fieldset>
        </div>
        <div className='flex gap-5 flex-wrap items-center'>
            <label htmlFor="type" className='font-semibold'>Amanaties: </label>
            <fieldset className='flex gap-2'>
              <input type="checkbox" id='parking' className='w-5' onChange={handleChange} checked={query.parking}/>
              <label htmlFor="parking">Parking</label>
            </fieldset>
            <fieldset className='flex gap-2'>
              <input type="checkbox" id='furnished' className='w-5' onChange={handleChange} checked={query.furnished}/>
              <label htmlFor="furnished">Furnished</label>
            </fieldset>
        </div>
        <div>
          <label htmlFor="sort" className='font-semibold'>Sort: </label>
          <select name="sort" id="sort_order" className='p-1 rounded-md capitalize border focus:outline-none w-[150px]' onChange={handleChange} defaultValue={"createdAt_desc"}>
            <option value="regularPrice_desc">Price high to low</option>
            <option value="regularPrice_asc">Price low to high</option>
            <option value="createdAt_desc">Latest</option>
            <option value="createdAt_asc">Oldest</option>
          </select>
        </div>
        <button className='bg-slate-700 p-2 text-center rounded-md text-white uppercase hover:opacity-85'>Search</button>
       </form>
      </div>
      <div className='mx-5 md:my-5'>
        <h1 className='text-2xl md:text-3xl text-slate-700 font-semibold border-4 p-1'>Listing results:</h1>
        <div className='font-semibold text-2xl text-red-700'>
        {listStatus.loading && <h1 className='text-center'>Loading...</h1>}
        {listStatus.error && <h1 className='text-center'>{listStatus.error}</h1>}
        {listings.length === 0 && <h1 className='text-center'>No listing found</h1>}
        </div>
        <div className='flex flex-wrap gap-5 mt-5'>
        {!listStatus.loading && !listStatus.error &&  listings.map(listing=>
            <ListingItem key={listing._id} listing={listing} />
        )}
        {!showMore.status && showMore.listings.length >0 && showMore.listings.map(listing=>
            <ListingItem key={listing._id} listing={listing} />
        )}
        </div>
        {showMore.status && <button 
        className='bg-slate-700 p-2 text-center rounded-md text-white uppercase hover:opacity-85 my-3'
        onClick={()=>setShowMore({...showMore,status:false})}
        >Show More</button>}
      </div>
    </div>
  )
}

