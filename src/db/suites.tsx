import type { IconType } from "react-icons";
import {
    MdAcUnit,
    MdAir,
    MdBathtub,
    MdBed,
    MdChair,
    MdCheckroom,
    MdFireExtinguisher,
    MdHotel,
    MdHotTub,
    MdKitchen,
    MdLocalCafe,
    MdLocalLaundryService,
    MdLock,
    MdMicrowave,
    MdPets,
    MdSecurity,
    MdSmokingRooms,
    MdSoap,
    MdTv,
    MdWarning,
    MdWifi,
} from "react-icons/md";

export interface AmenityItem {
    id: string;
    label: string;
    icon: IconType;
}

export interface Suite {
    id: string;
    name: string;
    shortDescription: string;
    rooms: number;
    meters: number;
    persons: number;
    bathroom: number;
    bed: number;
    bedType: string;
    price: number;
    amenities: AmenityItem[];
    images: string[]; // use public asset paths to avoid many imports
    noAmenities: AmenityItem[];
}

const commonAmenities: AmenityItem[] = [
    { id: "shampoo", label: "Xampu", icon: MdSoap },
    { id: "body-soap", label: "Sabonete para o corpo", icon: MdSoap },
    { id: "hot-water", label: "Água quente", icon: MdHotTub },
    { id: "hangers", label: "Cabides", icon: MdCheckroom },
    { id: "bed-linen", label: "Roupa de cama", icon: MdBed },
    { id: "extra-blankets-pillows", label: "Cobertor e travesseiros extras", icon: MdHotel },
    { id: "clothes-storage", label: "Local para guardar as roupas", icon: MdCheckroom },
    { id: "wifi", label: "Wi-fi", icon: MdWifi },
    { id: "tv", label: "TV", icon: MdTv },
    { id: "air-conditioning", label: "Ar-condicionado", icon: MdAcUnit },
    { id: "door-lock", label: "Tranca na porta do quarto", icon: MdLock },
    { id: "coffee-maker", label: "Cafeteira elétrica", icon: MdLocalCafe },
    { id: "smoking", label: "Permitido fumar", icon: MdSmokingRooms },
    { id: "refrigerator", label: "Refrigerador", icon: MdKitchen },
    { id: "chairs", label: "Cadeiras", icon: MdChair },
    { id: "pet-friendly", label: "Pet friendly", icon: MdPets },
];

const commonNoAmenities: AmenityItem[] = [
    { id: "hair-dryer", label: "Secador de cabelo", icon: MdAir },
    { id: "safe", label: "Cofre", icon: MdSecurity },
    { id: "bathtub", label: "Banheira", icon: MdBathtub },
    { id: "microwave", label: "Micro-ondas", icon: MdMicrowave },
    { id: "full-kitchen", label: "Cozinha completa", icon: MdKitchen },
    { id: "washing-machine", label: "Máquina de lavar", icon: MdLocalLaundryService },
    { id: "iron", label: "Ferro de passar roupas", icon: MdCheckroom },
    { id: "smoke-detector", label: "Detector de fumaça", icon: MdWarning },
    { id: "fire-extinguisher", label: "Extintor de incêndio", icon: MdFireExtinguisher },
];

export const suites: Suite[] = [
    {
        id: "suite-1",
        name: "Suíte Esperança 01",
        shortDescription:
            "A cama king e o ar-condicionado garantem o conforto da suíte. A TV Smart com Netflix oferece entretenimento...",
        rooms: 1,
        meters: 30,
        persons: 2,
        bathroom: 1,
        bed: 1,
        bedType: "Cama king",
        price: 250,
        amenities: [...commonAmenities],
        // coloque as imagens em public/suites/suite-1/ e referencie pelo caminho público
        images: [
            "/suites/suite1/example1.avif",
            "/suites/suite1/example2.avif",
            "/suites/suite1/example3.avif",
        ],
        noAmenities: [...commonNoAmenities],
    },
    {
        id: "suite-2",
        name: "Suíte Esperança 2",
        shortDescription:
            "Uma cama confortável, ar-condicionado e uma Smart TV com Netflix aumentam o apelo do quarto. Uma mesa de centro...",
        rooms: 1,
        meters: 30,
        persons: 2,
        bathroom: 1,
        bed: 1,
        bedType: "Cama casal",
        price: 250,
        amenities: [...commonAmenities],
        // coloque as imagens em public/suites/suite-1/ e referencie pelo caminho público
        images: [
            "/suites/suite2/example1.avif",
            "/suites/suite2/example2.avif",
        ],
        noAmenities: [...commonNoAmenities],
    },
    {
        id: "suite-3",
        name: "Suíte Esperança 3",
        shortDescription:
            "A Suíte 3 é ideal para até três pessoas que buscam conforto e tranquilidade em meio à natureza. Ampla e acolhedora...",
        rooms: 1,
        meters: 30,
        persons: 3,
        bathroom: 1,
        bed: 2,
        bedType: "1 cama casal + 1 cama solteiro",
        price: 250,
        amenities: [...commonAmenities],
        // coloque as imagens em public/suites/suite-1/ e referencie pelo caminho público
        images: [
            "/suites/suite3/example1.avif",
            "/suites/suite3/example2.avif",
            "/suites/suite3/example3.avif",
            "/suites/suite3/example4.avif",
        ],
        noAmenities: [...commonNoAmenities],
    },
    {
        id: "suite-4",
        name: "Suíte Esperança 4",
        shortDescription:
            "A cama confortável e o ar-condicionado garantem o conforto do quarto. A TV Smart com Netflix e o frigobar, junto à...",
        rooms: 1,
        meters: 30,
        persons: 2,
        bathroom: 1,
        bed: 1,
        bedType: "Cama casal",
        price: 250,
        amenities: [...commonAmenities],
        // coloque as imagens em public/suites/suite-1/ e referencie pelo caminho público
        images: [
            "/suites/suite4/example1.avif",
            "/suites/suite4/example2.avif",
            "/suites/suite4/example3.avif",
            "/suites/suite4/example4.avif",
        ],
        noAmenities: [...commonNoAmenities],
    },
    {
        id: "suite-5",
        name: "Suíte Esperança 5",
        shortDescription:
            "Com dois quartos, a suíte acomoda até quatro pessoas, garantindo conforto e privacidade. A varanda com rede oferece...",
        rooms: 2,
        meters: 30,
        persons: 4,
        bathroom: 1,
        bed: 2,
        bedType: "2 camas casal",
        price: 250,
        amenities: [...commonAmenities],
        // coloque as imagens em public/suites/suite-1/ e referencie pelo caminho público
        images: [
            "/suites/suite5/example1.avif",
            "/suites/suite5/example2.avif",
            "/suites/suite5/example3.avif",
            "/suites/suite5/example4.jpeg",
            "/suites/suite5/example5.avif",
        ],
        noAmenities: [...commonNoAmenities],
    },
    {
        id: "suite-6",
        name: "Suíte Chalé Esperança",
        shortDescription:
            "No térreo, o quarto oferece uma cama super king, sofá-cama, mesa de café, TV Smart de 43 polegadas, banheiro completo...",
        rooms: 1,
        meters: 30,
        persons: 8,
        bathroom: 1,
        bed: 5,
        bedType: "Cama super king + sofá-cama",
        price: 500,
        amenities: [...commonAmenities],
        // coloque as imagens em public/suites/suite-1/ e referencie pelo caminho público
        images: [
            "/suites/suite6/example1.avif",
            "/suites/suite6/example2.avif",
            "/suites/suite6/example3.avif",
            "/suites/suite6/example4.avif",
            "/suites/suite6/example5.avif",
            "/suites/suite6/example6.avif",
        ],
        noAmenities: [...commonNoAmenities],
    },
];