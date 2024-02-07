export default channelIterator = (sampler) => {
return (()=>{for (let colorIndex = 0; colorIndex < 3; colorIndex++) {
    sampler()
}})
}