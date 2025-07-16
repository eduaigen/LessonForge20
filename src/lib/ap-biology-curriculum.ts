
type Translation = {
    en: string;
    es: string;
};

type Lesson = {
    title: Translation;
    objective: Translation;
};

type Topic = {
    translations: Translation;
    lessons: Lesson[];
};

type Unit = {
    translations: Translation;
    topics: { [key: string]: Topic };
};

export const apBiologyCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Unit 1: Chemistry of Life": {
            translations: { en: "Unit 1: Chemistry of Life", es: "Unidad 1: Química de la Vida" },
            topics: {
                "Structure of Water and Hydrogen Bonding": {
                    translations: { en: "Structure of Water and Hydrogen Bonding", es: "Estructura del Agua y Enlaces de Hidrógeno" },
                    lessons: [{ title: { en: "Properties of Water", es: "Propiedades del Agua" }, objective: { en: "Explain how the properties of water that result from its polarity and hydrogen bonding affect its biological function.", es: "Explicar cómo las propiedades del agua, que resultan de su polaridad y enlaces de hidrógeno, afectan su función biológica." } }]
                },
                "Elements of Life": {
                    translations: { en: "Elements of Life", es: "Elementos de la Vida" },
                    lessons: [{ title: { en: "Macromolecule Composition", es: "Composición de Macromoléculas" }, objective: { en: "Describe the composition of macromolecules required by living organisms.", es: "Describir la composición de las macromoléculas requeridas por los organismos vivos." } }]
                },
                "Introduction to Macromolecules": {
                    translations: { en: "Introduction to Macromolecules", es: "Introducción a las Macromoléculas" },
                    lessons: [{ title: { en: "Building and Breaking Macromolecules", es: "Construcción y Ruptura de Macromoléculas" }, objective: { en: "Describe the chemical reactions that build and break biological macromolecules.", es: "Describir las reacciones químicas que construyen y rompen las macromoléculas biológicas." } }]
                },
                "Carbohydrates": {
                    translations: { en: "Carbohydrates", es: "Carbohidratos" },
                    lessons: [{ title: { en: "Structure and Function of Carbohydrates", es: "Estructura y Función de los Carbohidratos" }, objective: { en: "Describe the structure and function of carbohydrates.", es: "Describir la estructura y función de los carbohidratos." } }]
                },
                "Lipids": {
                    translations: { en: "Lipids", es: "Lípidos" },
                    lessons: [{ title: { en: "Structure and Function of Lipids", es: "Estructura y Función de los Lípidos" }, objective: { en: "Describe the structure and function of lipids.", es: "Describir la estructura y función de los lípidos." } }]
                },
                "Nucleic Acids": {
                    translations: { en: "Nucleic Acids", es: "Ácidos Nucleicos" },
                    lessons: [{ title: { en: "Structure and Function of DNA and RNA", es: "Estructura y Función del ADN y ARN" }, objective: { en: "Describe the structure and function of DNA and RNA.", es: "Describir la estructura y función del ADN y el ARN." } }]
                },
                "Proteins": {
                    translations: { en: "Proteins", es: "Proteínas" },
                    lessons: [{ title: { en: "Structure and Function of Proteins", es: "Estructura y Función de las Proteínas" }, objective: { en: "Describe the structure and function of proteins.", es: "Describir la estructura y función de las proteínas." } }]
                }
            }
        },
        "Unit 2: Cell Structure and Function": {
            translations: { en: "Unit 2: Cell Structure and Function", es: "Unidad 2: Estructura y Función Celular" },
            topics: {
                "Cell Structure and Function": {
                    translations: { en: "Cell Structure and Function", es: "Estructura y Función Celular" },
                    lessons: [{ title: { en: "Subcellular Components", es: "Componentes Subcelulares" }, objective: { en: "Explain how the structure and function of subcellular components and organelles contribute to the function of cells.", es: "Explicar cómo la estructura y función de los componentes subcelulares y los orgánulos contribuyen a la función de las células." } }]
                },
                "Cell Size": {
                    translations: { en: "Cell Size", es: "Tamaño Celular" },
                    lessons: [{ title: { en: "Surface Area to Volume Ratios", es: "Relación Superficie-Volumen" }, objective: { en: "Explain the effect of surface area-to-volume ratios on the exchange of materials between cells or organisms and the environment.", es: "Explicar el efecto de la relación superficie-volumen en el intercambio de materiales entre las células u organismos y el medio ambiente." } }]
                },
                "Plasma Membrane": {
                    translations: { en: "Plasma Membrane", es: "Membrana Plasmática" },
                    lessons: [{ title: { en: "Membrane Components", es: "Componentes de la Membrana" }, objective: { en: "Describe the roles of each of the components of the cell membrane in maintaining the internal environment of the cell.", es: "Describir las funciones de cada uno de los componentes de la membrana celular en el mantenimiento del ambiente interno de la célula." } }]
                },
                "Membrane Permeability": {
                    translations: { en: "Membrane Permeability", es: "Permeabilidad de la Membrana" },
                    lessons: [{ title: { en: "Selective Permeability", es: "Permeabilidad Selectiva" }, objective: { en: "Explain how the structure of biological membranes influences selective permeability.", es: "Explicar cómo la estructura de las membranas biológicas influye en la permeabilidad selectiva." } }]
                },
                "Membrane Transport": {
                    translations: { en: "Membrane Transport", es: "Transporte de Membrana" },
                    lessons: [{ title: { en: "Maintaining Water Balance", es: "Mantenimiento del Balance Hídrico" }, objective: { en: "Describe the mechanisms that organisms use to maintain solute and water balance and transport large molecules across the plasma membrane.", es: "Describir los mecanismos que utilizan los organismos para mantener el equilibrio de solutos y agua y transportar moléculas grandes a través de la membrana plasmática." } }]
                },
                "Facilitated Diffusion": {
                    translations: { en: "Facilitated Diffusion", es: "Difusión Facilitada" },
                    lessons: [{ title: { en: "Molecular Structure and Membrane Passage", es: "Estructura Molecular y Paso a través de la Membrana" }, objective: { en: "Explain how the structure of a molecule affects its ability to pass through the plasma membrane.", es: "Explicar cómo la estructura de una molécula afecta su capacidad para pasar a través de la membrana plasmática." } }]
                },
                "Tonicity and Osmoregulation": {
                    translations: { en: "Tonicity and Osmoregulation", es: "Tonicidad y Osmorregulación" },
                    lessons: [{ title: { en: "Concentration Gradients", es: "Gradientes de Concentración" }, objective: { en: "Explain how concentration gradients affect the movement of molecules across membranes and how osmoregulatory mechanisms contribute to the health and survival of organisms.", es: "Explicar cómo los gradientes de concentración afectan el movimiento de las moléculas a través de las membranas y cómo los mecanismos osmorreguladores contribuyen a la salud y supervivencia de los organismos." } }]
                },
                "Mechanisms of Transport": {
                    translations: { en: "Mechanisms of Transport", es: "Mecanismos de Transporte" },
                    lessons: [{ title: { en: "Ion and Molecule Movement", es: "Movimiento de Iones y Moléculas" }, objective: { en: "Describe the processes that allow ions and other molecules to move across membranes.", es: "Describir los procesos que permiten que los iones y otras moléculas se muevan a través de las membranas." } }]
                },
                "Cell Compartmentalization": {
                    translations: { en: "Cell Compartmentalization", es: "Compartimentalización Celular" },
                    lessons: [{ title: { en: "Eukaryotic Cell Structures", es: "Estructuras de la Célula Eucariota" }, objective: { en: "Describe the membrane-bound structures of the eukaryotic cell and explain how they contribute to compartmentalization.", es: "Describir las estructuras unidas por membranas de la célula eucariota y explicar cómo contribuyen a la compartimentalización." } }]
                },
                "Origins of Cell Compartmentalization": {
                    translations: { en: "Origins of Cell Compartmentalization", es: "Orígenes de la Compartimentalización Celular" },
                    lessons: [{ title: { en: "Prokaryotic vs Eukaryotic Cells", es: "Células Procariotas vs Eucariotas" }, objective: { en: "Describe similarities and/or differences in compartmentalization between prokaryotic and eukaryotic cells.", es: "Describir similitudes y/o diferencias en la compartimentalización entre células procariotas y eucariotas." } }]
                }
            }
        }
    }
};
