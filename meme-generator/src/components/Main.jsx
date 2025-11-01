import { useState, useEffect} from "react"

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })

    const [MemeList, setMemeList] = useState([]);

    function handleChange(event){
        // pulls in value and name of target(the input)
        const {value, name} = event.currentTarget
        
        setMeme((obj) =>{
            return {
                ...obj,
                //now u can use the name of the input so it refelcts the respective peice of state
                [name]: value
            }
        })
    }   

    useEffect(() => {
        //never use async or await in useEffect
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(data => setMemeList(data.data.memes))
        
        
    }, []);

    function getMemeImage(){
        const ran = Math.floor(Math.random() * MemeList.length)
        const ranMeme = MemeList[ran].url

        setMeme((onScreenMeme)=>{
            return {
                ...onScreenMeme,
                imageUrl: ranMeme
            }
        })
    }


    
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                    />
                </label>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}