
type Lesson = {
    title: string;
    objective: string;
};

type Topic = {
    topic: string;
    lessons: Lesson[];
};

type Unit = {
    unit: string;
    topics: { [key: string]: Topic };
};

export const apBiologyCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Unit 1: Chemistry of Life": {
            unit: "Unit 1: Chemistry of Life",
            topics: {
                "Structure of Water and Hydrogen Bonding": {
                    topic: "Structure of Water and Hydrogen Bonding",
                    lessons: [{ title: "Properties of Water", objective: "Explain how the properties of water that result from its polarity and hydrogen bonding affect its biological function." }]
                },
                "Elements of Life": {
                    topic: "Elements of Life",
                    lessons: [{ title: "Macromolecule Composition", objective: "Describe the composition of macromolecules required by living organisms." }]
                },
                "Introduction to Macromolecules": {
                    topic: "Introduction to Macromolecules",
                    lessons: [{ title: "Building and Breaking Macromolecules", objective: "Describe the chemical reactions that build and break biological macromolecules." }]
                },
                "Carbohydrates": {
                    topic: "Carbohydrates",
                    lessons: [{ title: "Structure and Function of Carbohydrates", objective: "Describe the structure and function of carbohydrates." }]
                },
                "Lipids": {
                    topic: "Lipids",
                    lessons: [{ title: "Structure and Function of Lipids", objective: "Describe the structure and function of lipids." }]
                },
                "Nucleic Acids": {
                    topic: "Nucleic Acids",
                    lessons: [{ title: "Structure and Function of DNA and RNA", objective: "Describe the structure and function of DNA and RNA." }]
                },
                "Proteins": {
                    topic: "Proteins",
                    lessons: [{ title: "Structure and Function of Proteins", objective: "Describe the structure and function of proteins." }]
                }
            }
        },
        "Unit 2: Cell Structure and Function": {
            unit: "Unit 2: Cell Structure and Function",
            topics: {
                "Cell Structure and Function": {
                    topic: "Cell Structure and Function",
                    lessons: [{ title: "Subcellular Components", objective: "Explain how the structure and function of subcellular components and organelles contribute to the function of cells." }]
                },
                "Cell Size": {
                    topic: "Cell Size",
                    lessons: [{ title: "Surface Area to Volume Ratios", objective: "Explain the effect of surface area-to-volume ratios on the exchange of materials between cells or organisms and the environment." }]
                },
                "Plasma Membrane": {
                    topic: "Plasma Membrane",
                    lessons: [{ title: "Membrane Components", objective: "Describe the roles of each of the components of the cell membrane in maintaining the internal environment of the cell." }]
                },
                "Membrane Permeability": {
                    topic: "Membrane Permeability",
                    lessons: [{ title: "Selective Permeability", objective: "Explain how the structure of biological membranes influences selective permeability." }]
                },
                "Membrane Transport": {
                    topic: "Membrane Transport",
                    lessons: [{ title: "Maintaining Water Balance", objective: "Describe the mechanisms that organisms use to maintain solute and water balance and transport large molecules across the plasma membrane." }]
                },
                "Facilitated Diffusion": {
                    topic: "Facilitated Diffusion",
                    lessons: [{ title: "Molecular Structure and Membrane Passage", objective: "Explain how the structure of a molecule affects its ability to pass through the plasma membrane." }]
                },
                "Tonicity and Osmoregulation": {
                    topic: "Tonicity and Osmoregulation",
                    lessons: [{ title: "Concentration Gradients", objective: "Explain how concentration gradients affect the movement of molecules across membranes and how osmoregulatory mechanisms contribute to the health and survival of organisms." }]
                },
                "Mechanisms of Transport": {
                    topic: "Mechanisms of Transport",
                    lessons: [{ title: "Ion and Molecule Movement", objective: "Describe the processes that allow ions and other molecules to move across membranes." }]
                },
                "Cell Compartmentalization": {
                    topic: "Cell Compartmentalization",
                    lessons: [{ title: "Eukaryotic Cell Structures", objective: "Describe the membrane-bound structures of the eukaryotic cell and explain how they contribute to compartmentalization." }]
                },
                "Origins of Cell Compartmentalization": {
                    topic: "Origins of Cell Compartmentalization",
                    lessons: [{ title: "Prokaryotic vs Eukaryotic Cells", objective: "Describe similarities and/or differences in compartmentalization between prokaryotic and eukaryotic cells." }]
                }
            }
        }
    }
};
