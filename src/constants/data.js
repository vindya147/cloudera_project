import images from "./images";
import {FaNewspaper, FaEdit, FaFileAlt, FaPhoneAlt, FaEnvelopeOpen, FaMapMarkerAlt} from "react-icons/fa";
import {FiShield }from "react-icons/fi"
import {MdAttachMoney} from "react-icons/md"
import {HiOutlineDocumentText} from "react-icons/hi";
import {IoLanguageOutline} from "react-icons/io5";
import {AiOutlineReload} from "react-icons/ai";

const gradient = "url(#blue-gradient)" ;

const services = [
    {
        id: 1,
        icon: <IoLanguageOutline style = {{ fill: gradient }} />,
        title: "Chatbot Inetface",
        text: "Intelligent, multilingual support leveraging translation APIs, relevance checks, and an extensive knowledge base for seamless communication."
    },
    {
        id: 2,
        icon: <MdAttachMoney style = {{ fill: gradient }} />,
        title: "Cost Comparison ",
        text: "Side-by-side analysis of cloud service providers to help you choose the best solutions."
    },
    {
        id: 3,
        icon: <FiShield style = {{ fill: gradient }} />,
        title: "Security Guidance",
        text: "Actionable insights and best practices to enhance your cloud security posture."
    },
    {
        id: 4, 
        icon: <FaEdit style = {{ fill: gradient }} />,
        title: "Relevance Check",
        text: "Verifies if user queries are related to cloud or networking."
    },
    {
        id: 5,
        icon: <HiOutlineDocumentText style = {{ fill: gradient }} />,
        title: "Posting Section",
        text: "Engage with a community of tech enthusiasts by sharing and discovering content."
    },
    {
        id: 6,
        icon: <FaNewspaper style = {{ fill: gradient }} />,
        title: "Tech News",
        text: "Stay informed with real-time updates on the latest industry trends directly from our admin-managed dashboard."
    }
];

const about = [
    {
        id: 7,
        text: "Welcome to Cloud Era, your ultimate platform for cloud computing insights, comparisons, and guidance. Designed to be a comprehensive resource, Cloud Era empowers users with tools and information to make informed decisions in the rapidly evolving world of cloud technology.At Cloud Era, we combine cutting-edge technology with a user-friendly experience. Our web-based application integrates a powerful chatbot interface powered by a Large Language Model (LLM), offering context-aware and accurate responses to your queries. Whether you're exploring cloud services, seeking security guidance, or comparing costs, our chatbot is equipped to assist with real-time, reliable information"
    }
]

const qualities = [
    {
        id: 8,
        icon: <FaFileAlt style = {{ fill: gradient }} />,
        title: "Ideas & Plans",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod."
    },
    {
        id: 9,
        icon: <AiOutlineReload style = {{ fill: gradient }}  />,
        title: "Prompt Strategies",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod."
    }
];

const features = [
    {
        id: 10,
        title: "Chatbot Inetface",
        text: "Intelligent, multilingual support leveraging translation APIs, relevance checks, and an extensive knowledge base for seamless communication."
    },
    {
        id: 11,
        title: "Cost Comparison",
        text: "Side-by-side analysis of cloud service providers to help you choose the best solutions."
    },
    {
        id: 12,
        title: "Security Guidance",
        text: "Actionable insights and best practices to enhance your cloud security posture."
    },
    {
        id: 13,
        title: "Relevance Check",
        text: "Verifies if user queries are related to cloud or networking."
    }, 
    {
        id: 14,
        title: "Posting Section",
        text: "Engage with a community of tech enthusiasts by sharing and discovering content."
    },
    {
        id: 15,
        title: "Tech News",
        text: "Stay informed with real-time updates on the latest industry trends directly from our admin-managed dashboard."
    }
];

const testimonials = [
    {
        id: 19,
        name: "Marie Jordan",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        image: images.customer_img_1,
        rating: 3
    },
    {
        id: 20,
        name: "Ann Brown",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        image: images.customer_img_2,
        rating: 5
    },
    {
        id: 21,
        name: "Andrew Bill",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        image: images.customer_img_3,
        rating: 2
    },
    {
        id: 22,
        name: "Jason Stawer",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        image: images.customer_img_4,
        rating: 4
    },
    {
        id: 23,
        name: "Lisa Green",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        image: images.customer_img_5,
        rating: 2
    },
    {
        id: 24,
        name: "Anna Doe",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        image: images.customer_img_6,
        rating: 4
    }
]

const contact = [
    {
        id: 25,
        icon: <FaPhoneAlt style = {{ fill: gradient }} />,
        info: "+425 235 712",
        text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing"
    },
    {
        id: 26,
        icon: <FaEnvelopeOpen style = {{ fill: gradient }} />,
        info: "solnhub@info.com",
        text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing"
    },
    {
        id: 27,
        icon: <FaMapMarkerAlt style = {{ fill: gradient }} />,
        info: "United Kingdom, New Street",
        text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing"
    }
]

const sections = {services, about, qualities, features, testimonials, contact};

export default sections;