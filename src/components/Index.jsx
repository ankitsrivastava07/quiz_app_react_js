import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Home from "./Home.jsx";
import { Routes, Route } from 'react-router-dom';
import About from "./About.jsx";
import NotFound from "./NotFound.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Quiz from "./Quiz.jsx";
import QuizCard from './QuizCard.jsx'
import StartQuizDashboard from './StartQuizDashboard.jsx'
import InstructionDashboard from "./InstructionDashboard.jsx";

function Index() { // Components should start with a Capital letter
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path = "/home" element = {<Home></Home>}></Route>
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/quiz/:subjectId" element={<QuizCard />}></Route>
                <Route path="/quiz/:quizId/instruction" element={<InstructionDashboard></InstructionDashboard>}></Route>
                <Route path="/quiz/:quizId/live" element={<StartQuizDashboard></StartQuizDashboard>}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default Index;
