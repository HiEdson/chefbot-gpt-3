import { React, useState } from 'react'
import Navbar from './Navbar.js';
import './Home.css'
import parse from 'html-react-parser';

const { Configuration, OpenAIApi } = require("openai");

const Home = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [ingredientes, setIngredientes]= useState('');
    const [receita, setReceita] = useState("");

    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const getReceita = async(e) => {
        e.preventDefault()
        if (isProcessing || ingredientes=='') return;
        setReceita("")
        setIsProcessing(true)
        //function here
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `apresente uma receita feita com ${ingredientes}, dentro de uma div com classe ingredientes crie um cabeçalho principal com o nome da receita e outro cabeçalho html com a palavra ingredientes e em seguida liste os ingredientes em uma html ul li, faça o mesmo com o modo de preparo.`,
            temperature: 0.9,
            max_tokens: 600, //1000
            top_p: 1.0,
            frequency_penalty: 0.2,
            presence_penalty: 0.0,
        });
        //after data from api
        console.log(response.data.choices[0].text)
        setReceita(response.data.choices[0].text)
        setIsProcessing(false)
    }
// farinha de rosca, camarão cozinho limpo, cebola média picada, alho, leite, ovo, sal e pimenta a gosto
    return (
        <>
            <header>
                <Navbar />
            </header>
            <body style={{ paddingTop: "150px", height: "100%" }}>
                <div className='container'>
                    <div>
                        <h1 className='text-center m-4'>
                            Sem ideias para o próximo jantar?
                        </h1>
                        <p className='text-center pt-5'>
                            "Dê-nos os ingredientes e deixe o <b>ChefBot</b> lhe ajudar a escolher uma refeição deliciosa!"
                        </p>
                    </div>
                    <div className='m-4'>
                        <form className='text-center'>
                            <div>
                                <textarea class=" shadow-none form-control w-75 mx-auto rounded textareaInput" placeholder="ex. 2 ovos, tomate maduro, arroz ..." style={{ height: "100px" }} onChange={(e)=>{setIngredientes(e.target.value)}}></textarea>
                            </div>
                            <button type='submit' className={`btn vw-50 btn-lg text-center m-3 receitaButton`} onClick={(e) => { getReceita(e) }}>
                                Ver receita
                            </button>
                        </form>
                        <div className='text-center'>
                            <div class={`spinner-grow text-info ${!isProcessing ? "d-none" : ""}`} role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 mb-5 w-75 mx-auto'>
                        {parse(receita)}
                        {/* <div class="ingredientes">
                            <h1>Rissóis de Camarão </h1>
                            <h2>Ingredientes:</h2>
                            <ul>
                                <li>50 g de farinha de rosca</li>
                                <li>200 g de camarão cozinho limpo</li>
                                <li>1 cebola média picada</li>
                                <li>2 dentes de alho picados</li>
                                <li>250 ml de leite</li>
                                <li>1 ovo</li>
                                <li>sal e pimenta a gosto</li>
                                <li>azeite</li>
                            </ul>

                            <h2>Modo de Preparo:</h2>
                            <ul>
                                <li>Coloque o leite, o sal, a pimenta e a farinha de rosca em uma vasilha e misture até obter um creme homogêneo.</ li>
                                <li>Em uma panela, aqueça o azeite e doure a cebola e o alho.</ li>
                                <li>Junte o camarão e refogue por 5 minutos.</ li>
                                <li>Acrescente o creme de leite à panela, misture e cozinhe por mais 10 minutos.</ li>
                                <li>Retire do fogo, adicione o ovo e misture até obter uma massa homogênea.</ li>
                                <li>Abra discos de massa folhados com um rolo de macarrão.</ li>
                                <li>Feche os discos recheados com a massa de camarão em formato de rissóis.</ li>
                                <li>Alem desses, também é possivel fritar os rissóis para que fiquem mais crocantes. </ li >
                            </ul>
                        </div> */}
                    </div>
                </div>
            </body>
        </>
    )
}

{/* <div class="spinner-grow text-info" role="status">
    <span class="visually-hidden">Loading...</span>
</div> */}

export default Home;


// textarea {
//     display: block;
//     margin - left: auto;
//     margin - right: auto;
// }