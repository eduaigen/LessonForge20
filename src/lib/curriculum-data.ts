
export type CurriculumContent = {
  [subject: string]: {
    units: {
      [unit: string]: {
        topics: {
          [topic: string]: {
            lessons: string[];
          }
        };
      };
    };
  };
};

export const curriculumData: {
  subjects: string[];
  grades: number[];
  content: CurriculumContent;
} = {
  subjects: ['AP Biology', 'Biology', 'Chemistry', 'Earth_Science', 'Physics', 'History', 'Literature', 'Health', 'Math'],
  grades: [9, 10, 11, 12],
  content: {
    'AP Biology': {
        units: {
            "Unit 1: Chemistry of Life": {
                topics: {
                    "Structure of Water and Hydrogen Bonding": { lessons: ["Explain how the properties of water that result from its polarity and hydrogen bonding affect its biological function."] },
                    "Elements of Life": { lessons: ["Describe the composition of macromolecules required by living organisms."] },
                    "Introduction to Macromolecules": { lessons: ["Describe the chemical reactions that build and break biological macromolecules."] },
                    "Carbohydrates": { lessons: ["Describe the structure and function of carbohydrates."] },
                    "Lipids": { lessons: ["Describe the structure and function of lipids."] },
                    "Nucleic Acids": { lessons: ["Describe the structure and function of DNA and RNA."] },
                    "Proteins": { lessons: ["Describe the structure and function of proteins."] }
                }
            },
            "Unit 2: Cell Structure and Function": {
                topics: {
                    "Cell Structure and Function": { lessons: ["Explain how the structure and function of subcellular components and organelles contribute to the function of cells."] },
                    "Cell Size": { lessons: ["Explain the effect of surface area-to-volume ratios on the exchange of materials between cells or organisms and the environment."] },
                    "Plasma Membrane": { lessons: ["Describe the roles of each of the components of the cell membrane in maintaining the internal environment of the cell."] },
                    "Membrane Permeability": { lessons: ["Explain how the structure of biological membranes influences selective permeability."] },
                    "Membrane Transport": { lessons: ["Describe the mechanisms that organisms use to maintain solute and water balance and transport large molecules across the plasma membrane."] },
                    "Facilitated Diffusion": { lessons: ["Explain how the structure of a molecule affects its ability to pass through the plasma membrane."] },
                    "Tonicity and Osmoregulation": { lessons: ["Explain how concentration gradients affect the movement of molecules across membranes and how osmoregulatory mechanisms contribute to the health and survival of organisms."] },
                    "Mechanisms of Transport": { lessons: ["Describe the processes that allow ions and other molecules to move across membranes."] },
                    "Cell Compartmentalization": { lessons: ["Describe the membrane-bound structures of the eukaryotic cell and explain how they contribute to compartmentalization."] },
                    "Origins of Cell Compartmentalization": { lessons: ["Describe similarities and/or differences in compartmentalization between prokaryotic and eukaryotic cells."] }
                }
            },
            "Unit 3: Cellular Energetics": {
                topics: {
                    "Enzymes": { lessons: ["Explain how enzymes affect the rate of biological reactions."] },
                    "Environmental Impacts on Enzyme Function": { lessons: ["Explain how changes to the structure of an enzyme may affect its function.", "Explain how the cellular environment affects enzyme activity."] },
                    "Cellular Energy": { lessons: ["Describe the role of energy in living organisms.", "Explain how shared, conserved, and fundamental processes and features support the concept of common ancestry for all organisms."] },
                    "Photosynthesis": { lessons: ["Describe the photosynthetic processes and structural features of the chloroplast that allow organisms to capture and store energy.", "Explain how cells capture energy from light and transfer it to biological molecules for storage and use."] },
                    "Cellular Respiration": { lessons: ["Describe the processes and structural features of mitochondria that allow organisms to use energy stored in biological macromolecules.", "Explain how cells obtain energy from biological macromolecules in order to power cellular functions."] }
                }
            },
            "Unit 4: Cell Communication and Cell Cycle": {
                topics: {
                    "Cell Communication": { lessons: ["Describe the ways that cells can communicate with one another.", "Explain how cells communicate with one another over short and long distances."] },
                    "Introduction to Signal Transduction": { lessons: ["Describe the components of a signal transduction pathway.", "Describe the role of components of a signal transduction pathway in producing a cellular response."] },
                    "Signal Transduction Pathways": { lessons: ["Describe the different types of cellular responses elicited by a signal transduction pathway.", "Explain how a change in the structure of any signaling molecule affects the activity of the signaling pathway."] },
                    "Feedback": { lessons: ["Explain how positive and negative feedback helps maintain homeostasis."] },
                    "Cell Cycle": { lessons: ["Describe the events that occur in the cell cycle.", "Explain how mitosis results in the transmission of chromosomes from one generation of cells to the next."] },
                    "Regulation of Cell Cycle": { lessons: ["Describe the role of checkpoints in regulating the cell cycle.", "Describe the effects of disruptions to the cell cycle on the cell or organism."] }
                }
            },
            "Unit 5: Heredity": {
                topics: {
                    "Meiosis": { lessons: ["Explain how meiosis results in the transmission of chromosomes from one generation to the next.", "Describe similarities and differences between the phases and outcomes of mitosis and meiosis."] },
                    "Meiosis and Genetic Diversity": { lessons: ["Explain how the process of meiosis generates genetic diversity."] },
                    "Mendelian Genetics": { lessons: ["Explain the inheritance of genes and traits as described by Mendel’s laws."] },
                    "Non-Mendelian Genetics": { lessons: ["Explain deviations from Mendel’s model of the inheritance of traits."] },
                    "Environmental Effects on Phenotype": { lessons: ["Explain how the same genotype can result in multiple phenotypes under different environmental conditions."] }
                }
            },
            "Unit 6: Gene Expression and Regulation": {
                topics: {
                    "DNA and RNA Structure": { lessons: ["Describe the structures involved in passing hereditary information from one generation to the next.", "Describe the characteristics of DNA that allow it to be used as hereditary material."] },
                    "DNA Replication": { lessons: ["Describe the mechanisms by which genetic information is copied for transmission between generations."] },
                    "Transcription and RNA Processing": { lessons: ["Describe the mechanisms by which genetic information flows from DNA to RNA to protein."] },
                    "Translation": { lessons: ["Explain how the phenotype of an organism is determined by its genotype."] },
                    "Regulation of Gene Expression": { lessons: ["Describe the types of interactions that regulate gene expression.", "Explain how the location of regulatory sequences relates to their function."] },
                    "Gene Expression and Cell Specialization": { lessons: ["Explain how the binding of transcription factors to promoter regions affects gene expression and the phenotype of the organism.", "Explain the connection between the regulation of gene expression and phenotypic differences in cells and organisms."] },
                    "Mutations": { lessons: ["Describe the various types of mutation.", "Explain how changes in genotype may result in changes in phenotype.", "Explain how alterations in DNA sequences contribute to variation that can be subject to natural selection."] },
                    "Biotechnology": { lessons: ["Explain the use of genetic engineering techniques in analyzing or manipulating DNA."] }
                }
            },
            "Unit 7: Natural Selection": {
                topics: {
                    "Introduction to Natural Selection": { lessons: ["Describe the causes of natural selection.", "Explain how natural selection affects populations."] },
                    "Natural Selection": { lessons: ["Describe the importance of phenotypic variation in a population.", "Explain how variation in molecules within cells connects to the fitness of an organism."] },
                    "Artificial Selection": { lessons: ["Explain how humans can affect diversity within a population."] },
                    "Population Genetics": { lessons: ["Explain how random occurrences affect the genetic makeup of a population.", "Describe the role of random processes in the evolution of specific populations.", "Describe the change in the genetic makeup of a population over time."] },
                    "Hardy–Weinberg Equilibrium": { lessons: ["Describe the conditions under which allele and genotype frequencies will change in populations."] },
                    "Evidence of Evolution": { lessons: ["Describe the types of data that provide evidence for evolution.", "Explain how morphological, biochemical, and geological data provide evidence that organisms have changed over time."] },
                    "Common Ancestry": { lessons: ["Describe structural and functional evidence on cellular and molecular levels that provides evidence for the common ancestry of all eukaryotes."] },
                    "Continuing Evolution": { lessons: ["Explain how evolution is an ongoing process in all living organisms."] },
                    "Phylogeny": { lessons: ["Describe the types of evidence that can be used to infer an evolutionary relationship.", "Explain how phylogenetic trees and cladograms can be used to infer evolutionary relatedness."] },
                    "Speciation": { lessons: ["Describe the conditions under which new species may arise.", "Describe the rate of evolution and speciation under different ecological conditions.", "Explain the processes and mechanisms that drive speciation."] },
                    "Variations in Populations": { lessons: ["Explain how the genetic diversity of a species or population affects its ability to withstand environmental pressures."] },
                    "Origins of Life on Earth": { lessons: ["Describe the scientific evidence that supports models of the origin of life on Earth."] }
                }
            },
            "Unit 8: Ecology": {
                topics: {
                    "Responses to the Environment": { lessons: ["Explain how the behavioral and physiological response of an organism is related to changes in internal or external environment.", "Explain how the behavioral responses of organisms affect their overall fitness and may contribute to the success of a population."] },
                    "Energy Flow Through Ecosystems": { lessons: ["Describe the strategies organisms use to acquire and use energy.", "Explain how energy flows and matter cycles through trophic levels.", "Explain how changes in energy availability affect populations, communities, and ecosystems.", "Explain how the activities of autotrophs and heterotrophs enable the flow of energy within an ecosystem."] },
                    "Population Ecology": { lessons: ["Describe factors that influence growth dynamics of populations."] },
                    "Effect of Density on Populations": { lessons: ["Explain how the density of a population affects and is determined by resource availability in the environment."] },
                    "Community Ecology": { lessons: ["Describe the structure of a community according to its species composition and diversity.", "Explain how interactions within and among populations influence community structure."] },
                    "Biodiversity": { lessons: ["Describe the relationship between ecosystem diversity and its resilience to changes in the environment.", "Explain how the addition or removal of any component of an ecosystem will affect its overall short-term and long-term structure."] },
                    "Disruptions in Ecosystems": { lessons: ["Explain the interaction between the environment and random or preexisting variations in populations.", "Explain how invasive species affect ecosystem dynamics.", "Describe human activities that lead to changes in ecosystem structure and dynamics.", "Explain how geological and meteorological activity leads to changes in ecosystem structure and dynamics."] }
                }
            }
        }
    },
    'Biology': {
      units: {
        "How do ecosystems work, and how can understanding them help us protect them?": {
          topics: {
            "Ecosystem Components and Interactions": { lessons: ["Why do ecosystems need protection, and how are they protected?", "What can other cases of conservation help us understand about ecosystems and conservation?", "Why do the animals in the Serengeti migrate?"] },
            "Conservation and Human Impact": { lessons: ["How is food driving the wildebeest migration?", "How do predators interact with the Serengeti ecosystem?", "How do humans interact with the Serengeti ecosystem?", "How do we evaluate if a conservation effort is working?"] },
            "Limiting Factors and Carrying Capacity": { lessons: ["How does food affect the population size?", "Can we apply what we figured out about limiting factors and carrying capacity to a new scenario?"] },
            "Biodiversity and Ecosystem Resilience": { lessons: ["What other components of the Serengeti system interact with the migration?", "Can we use everything we have figured out about ecosystems and conservation to expand conservation to new lands and waters?"] }
          }
        },
        "What causes fires in ecosystems to burn and how should we manage them?": {
          topics: {
            "Energy and Matter in Fire Systems": { lessons: ["How can fires burn under ice and release so much energy and matter?", "What is peat and why does it burn so much?"] },
            "Decomposition and Carbon Sinks": { lessons: ["Why is there so much peat that has not decomposed in the permafrost?", "How did so much plant energy and matter get into the peat in the zombie fire system?", "Could changes in the Earth's tilt cause more energy and matter to be stored in plants?"] },
            "Global Carbon Cycling and Fires": { lessons: ["How do zombie fires disrupt the flow of energy and cycle of matter in Arctic ecosystems?", "What is happening to carbon sinks in other ecosystems?", "Why should we be concerned that carbon sinks around the world are burning?", "What are the global effects of increased carbon dioxide from fires?"] },
            "Fire Management Solutions": { lessons: ["How can we help manage the matter and energy in fire systems?", "What decisions can we make to help manage fire in communities we care about?", "Can we use everything we have figured out about fires to explain a new phenomenon?"] }
          }
        },
        "Who gets cancer and why? Where should we focus efforts on treatment and prevention?": {
          topics: {
            "Cancer Incidence and Factors": { lessons: ["Who gets cancer and why?"] },
            "Cell Division and Cancer Development": { lessons: ["What is cancer?", "How do non-cancer cells become cancer cells?", "Why are some kinds of cancer more common than others in older and taller people?", "How do cancer cells end up with differences in their chromosomes and what is the role of p53 in preventing the differences?", "How do we make p53, and why is it different sometimes?"] },
            "Genetic and Environmental Causes of Cancer": { lessons: ["What is the genetic basis of cancer?", "Why do some cancers appear to run in families?", "How do genes interact with the environment to affect who gets cancer?"] },
            "Cancer Treatment and Prevention": { lessons: ["How do cancer treatments work?", "What can we do to support people in our communities who have cancer?"] }
          }
        },
        "Natural Selection & Evolution of Populations": {
          topics: {
            "Urbanization and Nonhuman Populations": { lessons: ["What is the effect of increasing urbanization on nonhuman populations?"] },
            "Selection Pressures and Trait Adaptation": { lessons: ["Why does hawksbeard make fewer feathery seeds in cities?", "Is poison a selection pressure?", "What causes populations of city juncos to be bolder than mountain juncos?", "How can we make sense of the way urbanization could have caused changes in hawksbeard, rat, and junco populations?", "Can we apply what we know about evolution by natural selection to another phenomenon?"] },
            "Genetic Diversity and Population Adaptation": { lessons: ["What happens when nonhuman populations are harmed by urbanization and what can we do about it?", "How can fragmentation lead to lower genetic diversity?"] },
            "Human-Engineered Solutions for Biodiversity": { lessons: ["How can we plan urban areas to protect genetic diversity in nonhuman populations?", "How can we use what we know about natural selection to design cities that support resilient populations and ecosystems?", "Can we apply what we know about natural selection and genetic diversity to a novel phenomenon?"] }
          }
        },
        "What will happen to Arctic bear populations as their environment changes?": {
          topics: {
            "Arctic Bear Populations and Climate Change": { lessons: ["How do changes in climate affect bear species coming together for the first time in the Arctic?"] },
            "Bear Interactions and Adaptations": { lessons: ["How and why are bear species interacting and why might brown bears dominate?", "How similar/different are the polar, brown, and black bears?"] },
            "Speciation and Common Ancestry": { lessons: ["How did polar and brown bears become different species?", "What will happen to Arctic bear populations as their environment changes?"] },
            "Extinction and Conservation Efforts": { lessons: ["What will happen to bear species in the Arctic in the future?", "How do past patterns of extinction help us understand possible consequences of extinctions now and in the future?", "What are our options for protecting species from extinction and should we implement them?", "Can we use everything we have figured out about speciation to explain a new phenomenon?"] }
          }
        }
      }
    },
    'Earth_Science': {
        units: {
            "Discovering New Worlds": {
                topics: {
                    "How do we know what’s out there in space?": { lessons: ["Making observations of the sky", "Using tools to extend our observations", "Understanding Earth's daily rotation", "Explaining the phases of the Moon", "Modeling solar and lunar eclipses", "Tracking the Sun's path across the sky", "Relating Earth's tilt to the seasons", "Investigating the intensity of solar energy", "Analyzing the light from distant stars", "Classifying stars using the Hertzsprung-Russell diagram", "Exploring the structure and scale of galaxies", "Applying knowledge to a new planetary system"] }
                }
            },
            "Earthquakes, Volcanoes, and Tsunamis: Who's at Risk?": {
                topics: {
                    "Assessing natural hazard risk": { lessons: ["Modeling the layers of the Earth", "Understanding the theory of plate tectonics", "Investigating interactions at plate boundaries", "Explaining the cause and effects of earthquakes", "Analyzing the formation and eruption of volcanoes", "Using maps to identify areas of high risk", "Connecting underwater earthquakes to tsunami formation", "Investigating factors that make communities vulnerable", "Designing structures to withstand seismic activity", "Developing plans to improve community resilience", "Conducting a risk assessment for a specific location"] }
                }
            },
            "Climate Change Throughout Human History": {
                topics: {
                    "Investigating past and future climate": { lessons: ["Analyzing data from ice cores", "Interpreting climate evidence from ice core data", "Modeling the greenhouse effect", "Tracing the movement of carbon through Earth's systems", "Investigating the human contribution to climate change", "Analyzing data and predicting future sea level rise", "Investigating the effects of climate change on ecosystems", "Evaluating strategies to reduce carbon emissions", "Exploring controversial geoengineering solutions", "Communicating climate change findings to the public"] }
                }
            },
            "More Hurricanes and Blizzards in NYC?": {
                topics: {
                    "Analyzing extreme weather events": { lessons: ["Distinguishing between weather and climate", "Modeling the interaction of air masses and fronts", "Investigating the conditions for hurricane formation", "Analyzing historical hurricane data", "Exploring the link between climate change and hurricane intensity", "Understanding the conditions that lead to blizzards", "Analyzing historical blizzard data", "Assessing the vulnerability of infrastructure to extreme weather", "Proposing designs to make infrastructure more resilient", "Developing a proposal to protect infrastructure"] }
                }
            },
            "Solutions for a Sustainable Future": {
                topics: {
                    "Understanding our reliance on fossil fuels": { lessons: ["Investigating air and water pollution, acid rain, and the ozone layer", "Exploring renewable energy sources and energy efficiency", "Analyzing the impacts of deforestation, urbanization, and agriculture on biodiversity", "Investigating the environmental and social impacts of mining", "Developing a comprehensive sustainability plan for a community"] }
                }
            },
            "Probability of Life Elsewhere": {
                topics: {
                    "Investigating the factors that contribute to a stable solar system": { lessons: ["Exploring the interconnected history of Earth and life", "Understanding the Big Bang theory and the formation of elements", "Assessing the risk of impact events and exploring planetary defense", "Writing a report on the probability of life on an exoplanet"] }
                }
            }
        }
    },
    Chemistry: {
      units: {
        "Why are oysters dying, and how can we use chemistry to protect them?": {
          topics: {
            "What large and small-scale processes make water more or less acidic?": {
              lessons: [
                "What is happening to oysters?",
                "How can we break down the problem so we can solve it?",
                "Can carbon dioxide make the ocean more acidic?",
                "What is it about a substance that determines whether it produces more or fewer H+ or OH- ions when it is added to water?",
                "How does carbon dioxide move between the atmosphere and ocean systems to cause the water to become more acidic?",
                "How can acidic water become less acidic again?",
                "How can we use what we have learned to help protect oysters?",
              ],
            },
            "What mathematical models can help us determine the scale of the reactions needed to save oysters?": {
              lessons: [
                "How can we figure out how much of a substance we need to neutralize acid?",
                "How much NaOH would we need to add to make ocean water safe for oysters?",
                "How does ocean acidification hurt oysters?",
                "How can we help oysters build shells quickly?",
              ],
            },
            "How can engineering design help us determine the best process to save oysters?": {
              lessons: [
                "What criteria and constraints do we need to consider when designing solutions to help protect oysters?",
                "How can we apply our science ideas to develop a solution to help protect oysters?",
                "How well do our different design solutions address our criteria and constraints?",
                "How can we apply our learning to other situations?",
              ],
            },
          },
        },
        "How can we slow the flow of energy on Earth to protect vulnerable coastal communities?": {
          topics: {
            "Why and how is the sea level rising?": {
              lessons: [
                "How are sea levels rising and forcing people to move?",
                "What can the past help us figure out about what is causing sea level rise in the present?",
                "How does carbon dioxide contribute to climate change?",
                "What would happen if the Earth's ice melted?",
              ],
            },
            "What solutions could help slow polar ice melt?": {
              lessons: [
                "How can we best slow or stop the land ice melt?",
                "Why would some engineers want to sprinkle glass microbeads on the Arctic?",
                "How do feedback loops affect Earth's systems?",
              ],
            },
            "How well would the berm solution work in the context of Earth systems?": {
              lessons: [
                "What is going on where the ice meets the water?",
                "Why does warm salty water sink to melt a glacier?",
                "How can we measure the energy transfer a berm prevents?",
                "How does heat affect the amount of ice melt?",
                "How can we slow the flow of energy on Earth to protect vulnerable coastal communities?",
                "How can we model what will happen to Earth's climate if humans make changes?",
              ],
            },
          },
        },
        "What causes lightning and why are some places safer than others when it strikes?": {
          topics: {
            "What is lightning?": {
              lessons: [
                "When and where does lightning occur and what are its impacts?",
                "What parts of the (smaller-scale) system might be causing the (smaller-scale) lightning?",
                "What is the spark in the water dropper system and what else is happening in the system before it appears?",
                "What happens when we produce static electricity?",
                "What is happening at a particle level to produce static effects?",
              ],
            },
            "What causes a lightning strike?": {
              lessons: [
                "What causes static in a lightning system?",
                "How are electrostatic forces between objects affected by the amount of charge and the distance between them?",
                "How can something that is neutral have an attractive or repulsive interaction with another object without any contact?",
                "How can we revise our models to explain what we have figured out about the lightning system?",
              ],
            },
            "How and why does a lightning strike transfer so much energy?": {
              lessons: [
                "Where does the energy come from for lightning to strike across miles of air?",
                "Why do the electrons build up in the cloud and then jump to the ground suddenly?",
              ],
            },
            "What makes some places safer than others when lightning strikes?": {
              lessons: [
                "Why are some structures safer than others (and safer than being outside)?",
                "Why are you supposed to get away from water when there is lightning nearby?",
                "Why are some places safer than others when lightning strikes?",
              ],
            },
          },
        },
        "How can chemistry help us evaluate fuels and transportation options to benefit the Earth and our communities?": {
          topics: {
            "How do carbon-based fuels release energy?": {
              lessons: [
                "What different fuels have we used, and do we currently use, for transportation?",
                "What is happening to the fuels inside the engine to make the vehicle move?",
                "How can diesel engines be working so differently from gasoline engines?",
                "Why do we need to put energy into the system to start the reaction?",
                "How and why is energy released when we burn carbon-based fuels?",
                "How does the amount of energy we put into the reaction system compare to the energy we get out?",
                "How can fuels release different amounts of energy when they all have bonds breaking and forming?",
                "How does our understanding of carbon-based fuels inform our decision-making?",
              ],
            },
            "How do fuels that are not carbon based release energy?": {
              lessons: [
                "Where is the energy coming from (and what are some trade-offs) when we use batteries to power vehicles?",
                "How can we use hydrogen as a fuel and what are the impacts?",
                "Where is the energy coming from when we use uranium as a fuel?",
                "How can our knowledge of fuel trade-offs support our evaluation of future rocket fuels?",
              ],
            },
            "How can we use what we have learned to improve our transportation system?": {
              lessons: [
                "Why do we use some fuels rather than others?",
                "How do we decide on the best transportation options for our future?",
                "How can we make transportation decisions to benefit our communities and Earth?",
              ],
            },
          },
        },
        "How can we find, make, and recycle the substances we need to live on and beyond Earth?": {
          topics: {
            "How can we find water and other substances we need to survive on other objects in space?": {
              lessons: [
                "What substances would we need and how would we get them to live and work beyond Earth?",
                "How does water support life and chemical reactions?",
                "How can we find evidence of the water we need on the surfaces of other objects in space?",
                "How and why do water and other liquids interact with materials to make surface features?",
                "How can we tell what is in the atmosphere (and just below the surface) of objects in space?",
              ],
            },
            "Why do we need certain types of atoms to create the substances we need?": {
              lessons: [
                "What patterns are there between the types of atoms and the number of bonds they form in the resources we need?",
                "Why is there a difference between the number of electrons an element has and the number of bonds an element forms?",
                "Could another substance serve as a substitute for water for some of the processes we need to use it for in space?",
                "How can the ideas we developed be applied to making a possible substitute for another substance?",
              ],
            },
            "How can we make the substances we need to survive off of Earth using the existing matter in the solar system?": {
              lessons: [
                "Why do we need water in so many reactions?",
                "How can we grow food in space?",
                "Which location(s) in the solar system has the elements we need and what relative amount is required to make any substance?",
              ],
            },
            "How can we be more sustainable in what we use and produce?": {
              lessons: [
                "Why can we recycle some of the substances we need and not others?",
                "What are some more sustainable approaches we are developing to help us make the things we need off of Earth and on it?",
                "What is the full impact of going to space?",
              ],
            },
          },
        },
      },
    },
    Physics: {
      units: {
        "Forces in Earth's Interior": {
          topics: {
            "Land Stretching and Breaking": {
              lessons: [
                "What is happening in the Afar region?",
                "What allows a system to remain stable when forces are acting on it, and what causes it to suddenly change?",
                "What happens to the matter and energy in a system when the magnitude of balanced forces on it increases?",
                "What is changing in the matter at a particle level before an earthquake, and when a solid elastically deforms or breaks?",
                "How do we investigate the connection between matter in Earth's interior and surface features above?",
                "How is temperature related to the behavior of the matter in the mantle?",
                "Where does the energy that drives convection come from?",
              ]
            }
          }
        }
      }
    },
    History: {
      units: {
        "Foundations of Civilization": {
          topics: {
            "Early Humans": { lessons: ["Early Humans"] },
            "Neolithic Revolution": { lessons: ["Neolithic Revolution"] },
            "River Valley Civilizations": { lessons: ["River Valley Civilizations"] }
          }
        },
        "Classical Civilizations": {
          topics: {
            "Greece and Rome": { lessons: ["Greece and Rome"] },
            "India and China": { lessons: ["India and China"] },
            "Belief Systems": { lessons: ["Belief Systems"] }
          }
        },
        "Post-Classical World": {
          topics: {
            "Islamic World": { lessons: ["Islamic World"] },
            "Byzantines": { lessons: ["Byzantines"] },
            "Feudalism": { lessons: ["Feudalism"] }
          }
        },
        "Closing Project": {
          topics: {
            "Performance-Based Global Synthesis": { lessons: ["Performance-Based Global Synthesis"] }
          }
        },
        "Age of Revolutions": {
          topics: {
            "Enlightenment": { "lessons": ["Enlightenment"] },
            "French Revolution": { "lessons": ["French Revolution"] },
            "Industrial Revolution": { "lessons": ["Industrial Revolution"] }
          }
        },
        "Imperialism and Nationalism": {
          topics: {
            "Africa and Asia": { "lessons": ["Africa and Asia"] },
            "Latin America": { "lessons": ["Latin America"] },
            "Resistance Movements": { "lessons": ["Resistance Movements"] }
          }
        },
        "20th Century Conflicts": {
          topics: {
            "World Wars": { "lessons": ["World Wars"] },
            "Cold War": { "lessons": ["Cold War"] },
            "Genocide": { "lessons": ["Genocide"] }
          }
        },
        "Contemporary Issues": {
          topics: {
            "Globalization": { "lessons": ["Globalization"] },
            "Terrorism": { "lessons": ["Terrorism"] },
            "Environmental Challenges": { "lessons": ["Environmental Challenges"] }
          }
        },
        "Closing Performance Task": {
          topics: {
            "Global History Regents Review": { "lessons": ["Global History Regents Review"] }
          }
        },
        "Constitutional Foundations": {
          topics: {
            "Colonial America": { "lessons": ["Colonial America"] },
            "Constitutional Convention": { "lessons": ["Constitutional Convention"] },
            "Bill of Rights": { "lessons": ["Bill of Rights"] }
          }
        },
        "Expansion & Reform": {
          topics: {
            "Civil War": { "lessons": ["Civil War"] },
            "Reconstruction": { "lessons": ["Reconstruction"] },
            "Progressive Era": { "lessons": ["Progressive Era"] }
          }
        },
        "20th Century US": {
          topics: {
            "Great Depression": { "lessons": ["Great Depression"] },
            "World Wars": { "lessons": ["World Wars"] },
            "Civil Rights Movement": { "lessons": ["Civil Rights Movement"] }
          }
        },
        "Modern America": {
          topics: {
            "Reagan Era": { "lessons": ["Reagan Era"] },
            "War on Terror": { "lessons": ["War on Terror"] },
            "Contemporary Policies": { "lessons": ["Contemporary Policies"] }
          }
        },
        "Regents Review": {
          topics: {
            "DBQ Practice": { "lessons": ["DBQ Practice"] },
            "Thematic Essay Practice": { "lessons": ["Thematic Essay Practice"] },
            "Civic Literacy Tasks": { "lessons": ["Civic Literacy Tasks"] }
          }
        },
         "Foundations of Government": {
          topics: {
            "Types of Government": { "lessons": ["Types of Government"] },
            "Voting Rights": { "lessons": ["Voting Rights"] },
            "Political Ideologies": { "lessons": ["Political Ideologies"] }
          }
        },
        "Public Policy & Citizenship": {
          topics: {
            "Policy Making": { "lessons": ["Policy Making"] },
            "Civic Engagement": { "lessons": ["Civic Engagement"] },
            "Role of Media": { "lessons": ["Role of Media"] }
          }
        },
        "Economic Systems": {
          topics: {
            "Supply and Demand": { "lessons": ["Supply and Demand"] },
            "Market Structures": { "lessons": ["Market Structures"] },
            "Government Regulation": { "lessons": ["Government Regulation"] }
          }
        },
        "Global Interdependence": {
          topics: {
            "Trade": { "lessons": ["Trade"] },
            "Sustainability": { "lessons": ["Sustainability"] },
            "International Economics": { "lessons": ["International Economics"] }
          }
        },
        "Senior Exit Project": {
          topics: {
            "Capstone Policy Presentation": { "lessons": ["Capstone Policy Presentation"] }
          }
        }
      }
    },
    Literature: {
      units: {}
    },
    Health: {
        units: {
            "Communication & Healthy Relationships": {
                topics: {
                    "Understanding Communication": { lessons: ["To understand the foundational elements of effective listening and appropriate responses in health contexts."] },
                    "Verbal & Non-Verbal Communication": { lessons: ["To master expressing oneself clearly and respectfully, both through words and body language."] },
                    "Expressing Needs & Feelings": { lessons: ["To learn constructive methods for sharing personal emotions and desires without causing harm."] },
                    "Impact of Interpersonal Communication": { lessons: ["To critically examine the dynamic interplay between communication patterns and relationship health."] },
                    "Overcoming Communication Barriers": { lessons: ["To equip students with tools to navigate and resolve obstacles to effective communication in health-related contexts."] },
                    "Respectful Communication & Empathy": { lessons: ["To foster an environment of mutual respect and understanding through communication."] },
                    "Effective Refusal Skills": { lessons: ["To confidently and respectfully say 'no' to unhealthy or unsafe pressures."] },
                    "Conflict Prevention & Management": { lessons: ["To learn proactive and reactive approaches to navigate disagreements constructively."] },
                    "Collaboration for Health Issues": { lessons: ["To work effectively in groups to achieve shared health-related goals."] },
                    "Family as the Basic Unit of Society": { lessons: ["To appreciate the diversity of family structures and their fundamental role in society."] },
                    "Family Roles, Responsibilities & Needs": { lessons: ["To identify the reciprocal nature of support within families and the importance of meeting individual needs."] },
                    "Privacy & Respect in Relationships": { lessons: ["To develop an understanding of boundaries and ethical considerations in personal information sharing."] },
                    "Culture & Relationships": { lessons: ["To recognize the diverse influences on interpersonal dynamics and self-identity."] },
                    "Growth, Appearance & Interests": { lessons: ["To embrace personal evolution and the acceptance of oneself and others through various life stages."] },
                    "Uniqueness & Respect for All": { lessons: ["To foster an inclusive environment where every individual's inherent worth is recognized and celebrated."] }
                }
            }
        }
    },
    Math: {
      units: {
        "Unit 1: One-Variable Statistics": {
          topics: {
            "Section A: Getting to Know You": {
              lessons: [
                "Lesson 1: Getting to Know You",
                "Lesson 2: Data Representations",
                "Lesson 3: A Gallery of Data"
              ]
            },
            "Section B: Distribution Shapes": {
              lessons: [
                "Lesson 4: The Shape of Distributions",
                "Lesson 5: Calculating Measures of Center and Variability"
              ]
            },
            "Section C: How to Use Spreadsheets": {
              lessons: [
                "Lesson 6: Mystery Computations",
                "Lesson 7: Spreadsheet Computations",
                "Lesson 8: Spreadsheet Shortcuts"
              ]
            },
            "Section D: Manipulating Data": {
              lessons: [
                "Lesson 9: Technological Graphing",
                "Lesson 10: The Effect of Extremes",
                "Lesson 11: Comparing and Contrasting Data Distributions",
                "Lesson 12: Standard Deviation",
                "Lesson 13: More Standard Deviation",
                "Lesson 14: Outliers",
                "Lesson 15: Comparing Data Sets"
              ]
            },
            "Section E: Let's Put It to Work": {
              lessons: [
                "Lesson 16: Analyzing Data"
              ]
            }
          }
        },
        "Unit 2: Linear Equations and Systems": {
          topics: {
            "Section A: Writing and Modeling with Equations": {
              lessons: [
                "Lesson 1: Planning a Party",
                "Lesson 2: Writing Equations to Model Relationships (Part 1)",
                "Lesson 3: Writing Equations to Model Relationships (Part 2)",
                "Lesson 4: Equations and Their Solutions",
                "Lesson 5: Equations and Their Graphs"
              ]
            },
            "Section B: Manipulating Equations and Understanding Their Structure": {
              lessons: [
                "Lesson 6: Equivalent Equations",
                "Lesson 7: Explaining Steps for Rewriting Equations",
                "Lesson 8: Which Variable to Solve for? (Part 1)",
                "Lesson 9: Which Variable to Solve for? (Part 2)",
                "Lesson 10: Connecting Equations to Graphs (Part 1)",
                "Lesson 11: Connecting Equations to Graphs (Part 2)"
              ]
            },
            "Section C: Systems of Linear Equations in Two Variables": {
              lessons: [
                "Lesson 12: Writing and Graphing Systems of Linear Equations",
                "Lesson 13: Solving Systems by Substitution",
                "Lesson 14: Solving Systems by Elimination (Part 1)",
                "Lesson 15: Solving Systems by Elimination (Part 2)",
                "Lesson 16: Solving Systems by Elimination (Part 3)",
                "Lesson 17: Systems of Linear Equations and Their Solutions"
              ]
            },
            "Section D: Let's Put It to Work": {
              lessons: [
                "Lesson 18: Asking about Solving Systems",
                "Lesson 19: Linear Patterns"
              ]
            }
          }
        },
        "Unit 3: Two-Variable Statistics": {
          topics: {
            "Section A: Two-Way Tables": {
              lessons: [
                "Lesson 1: Two-Way Tables",
                "Lesson 2: Relative Frequency Tables",
                "Lesson 3: Associations in Categorical Data"
              ]
            },
            "Section B: Scatter Plots": {
              lessons: [
                "Lesson 4: Linear Models",
                "Lesson 5: Fitting Lines",
                "Lesson 6: Residuals"
              ]
            },
            "Section C: Correlation Coefficients": {
              lessons: [
                "Lesson 7: The Correlation Coefficient",
                "Lesson 8: Using the Correlation Coefficient",
                "Lesson 9: Causal Relationships"
              ]
            },
            "Section D: Let's Put It to Work": {
              lessons: [
                "Lesson 10: Fossils and Flags"
              ]
            }
          }
        },
        "Unit 4: Linear Inequalities and Systems": {
          topics: {
            "Section A: Linear Inequalities in One Variable": {
              lessons: [
                "Lesson 1: Representing Situations with Inequalities",
                "Lesson 2: Solutions to Inequalities in One Variable",
                "Lesson 3: Writing and Solving Inequalities in One Variable"
              ]
            },
            "Section B: Linear Inequalities in Two Variables": {
              lessons: [
                "Lesson 4: Graphing Linear Inequalities in Two Variables (Part 1)",
                "Lesson 5: Graphing Linear Inequalities in Two Variables (Part 2)",
                "Lesson 6: Solving Problems with Inequalities in Two Variables"
              ]
            },
            "Section C: Systems of Linear Inequalities in Two Variables": {
              lessons: [
                "Lesson 7: Solutions to Systems of Linear Inequalities in Two Variables",
                "Lesson 8: Solving Problems with Systems of Linear Inequalities in Two Variables",
                "Lesson 9: Modeling with Systems of Inequalities in Two Variables"
              ]
            }
          }
        },
        "Unit 5: Functions": {
          topics: {
            "Section A: Functions and Their Representations": {
              lessons: [
                "Lesson 1: Describing and Graphing Situations",
                "Lesson 2: Function Notation",
                "Lesson 3: Interpreting and Using Function Notation",
                "Lesson 4: Using Function Notation to Describe Rules (Part 1)",
                "Lesson 5: Using Function Notation to Describe Rules (Part 2)"
              ]
            },
            "Section B: Analyzing and Creating Graphs of Functions": {
              lessons: [
                "Lesson 6: Features of Graphs",
                "Lesson 7: Using Graphs to Find Average Rate of Change",
                "Lesson 8: Interpreting and Creating Graphs",
                "Lesson 9: Comparing Graphs"
              ]
            },
            "Section C: A Closer Look at Inputs and Outputs": {
              lessons: [
                "Lesson 10: Domain and Range (Part 1)",
                "Lesson 11: Domain and Range (Part 2)",
                "Lesson 12: Piecewise Functions",
                "Lesson 13: Absolute Value Functions (Part 1)",
                "Lesson 14: Absolute Value Functions (Part 2)"
              ]
            },
            "Section D: Inverse Functions": {
              lessons: [
                "Lesson 15: Inverse Functions",
                "Lesson 16: Finding and Interpreting Inverse Functions",
                "Lesson 17: Writing Inverse Functions to Solve Problems"
              ]
            },
            "Section E: Let's Put It to Work": {
              lessons: [
                "Lesson 18: Using Functions to Model Battery Power"
              ]
            }
          }
        },
        "Unit 6: Introduction to Exponential Functions": {
          topics: {
            "Section A: Looking at Growth": {
              lessons: [
                "Lesson 1: Growing and Growing",
                "Lesson 2: Patterns of Growth"
              ]
            },
            "Section B: A New Kind of Relationship": {
              lessons: [
                "Lesson 3: Representing Exponential Growth",
                "Lesson 4: Representing Exponential Decay",
                "Lesson 5: Understanding Decay",
                "Lesson 6: Analyzing Graphs",
                "Lesson 7: Using Negative Exponents"
              ]
            },
            "Section C: Exponential Functions": {
              lessons: [
                "Lesson 8: Exponential Situations as Functions",
                "Lesson 9: Interpreting Exponential Functions",
                "Lesson 10: Looking at Rates of Change",
                "Lesson 11: Modeling Exponential Behavior",
                "Lesson 12: Reasoning about Exponential Graphs (Part 1)",
                "Lesson 13: Reasoning about Exponential Graphs (Part 2)"
              ]
            },
            "Section D: Percent Growth and Decay": {
              lessons: [
                "Lesson 14: Recalling Percent Change",
                "Lesson 15: Functions Involving Percent Change",
                "Lesson 16: Compounding Interest",
                "Lesson 17: Different Compounding Intervals",
                "Lesson 18: Expressed in Different Ways"
              ]
            },
            "Section E: Comparing Linear and Exponential Functions": {
              lessons: [
                "Lesson 19: Which One Changes Faster?",
                "Lesson 20: Changes over Equal Intervals"
              ]
            },
            "Section F: Let's Put It to Work": {
              lessons: [
                "Lesson 21: Predicting Populations"
              ]
            }
          }
        },
        "Unit 7: Introduction to Quadratic Functions": {
          topics: {
            "Section A: A Different Kind of Change": {
              lessons: [
                "Lesson 1: A Different Kind of Change",
                "Lesson 2: How Does It Change?"
              ]
            },
            "Section B: Quadratic Functions": {
              lessons: [
                "Lesson 3: Building Quadratic Functions from Geometric Patterns",
                "Lesson 4: Comparing Quadratic and Exponential Functions",
                "Lesson 5: Building Quadratic Functions to Describe Situations (Part 1)",
                "Lesson 6: Building Quadratic Functions to Describe Situations (Part 2)",
                "Lesson 7: Building Quadratic Functions to Describe Situations (Part 3)"
              ]
            },
            "Section C: Working with Quadratic Expressions": {
              lessons: [
                "Lesson 8: Equivalent Quadratic Expressions",
                "Lesson 9: Standard Form and Factored Form",
                "Lesson 10: Graphs of Functions in Standard and Factored Forms"
              ]
            },
            "Section D: Features of Graphs of Quadratic Functions": {
              lessons: [
                "Lesson 11: Graphing from the Factored Form",
                "Lesson 12: Graphing the Standard Form (Part 1)",
                "Lesson 13: Graphing the Standard Form (Part 2)",
                "Lesson 14: Graphs That Represent Situations",
                "Lesson 15: Vertex Form",
                "Lesson 16: Graphing from the Vertex Form",
                "Lesson 17: Changing the Vertex"
              ]
            }
          }
        },
        "Unit 8: Quadratic Equations": {
          topics: {
            "Section A: Finding Unknown Inputs": {
              lessons: [
                "Lesson 1: Finding Unknown Inputs",
                "Lesson 2: When and Why Do We Write Quadratic Equations?"
              ]
            },
            "Section B: Solving Quadratic Equations": {
              lessons: [
                "Lesson 3: Solving Quadratic Equations by Reasoning",
                "Lesson 4: Solving Quadratic Equations with the Zero Product Property",
                "Lesson 5: How Many Solutions?",
                "Lesson 6: Rewriting Quadratic Expressions in Factored Form (Part 1)",
                "Lesson 7: Rewriting Quadratic Expressions in Factored Form (Part 2)",
                "Lesson 8: Rewriting Quadratic Expressions in Factored Form (Part 3)",
                "Lesson 9: Solving Quadratic Equations by Using Factored Form",
                "Lesson 10: Rewriting Quadratic Expressions in Factored Form (Part 4)"
              ]
            },
            "Section C: Completing the Square": {
              lessons: [
                "Lesson 11: What Are Perfect Squares?",
                "Lesson 12: Completing the Square (Part 1)",
                "Lesson 13: Completing the Square (Part 2)",
                "Lesson 14: Completing the Square (Part 3)",
                "Lesson 15: Quadratic Equations with Irrational Solutions"
              ]
            },
            "Section D: The Quadratic Formula": {
              lessons: [
                "Lesson 16: The Quadratic Formula",
                "Lesson 17: Applying the Quadratic Formula (Part 1)",
                "Lesson 18: Applying the Quadratic Formula (Part 2)",
                "Lesson 19: Deriving the Quadratic Formula",
                "Lesson 20: Rational and Irrational Solutions",
                "Lesson 21: Sums and Products of Rational and Irrational Numbers"
              ]
            },
            "Section E: Vertex Form Revisited": {
              lessons: [
                "Lesson 22: Rewriting Quadratic Expressions in Vertex Form",
                "Lesson 23: Using Quadratic Expressions in Vertex Form to Solve Problems"
              ]
            },
            "Section F: Let's Put It to Work": {
              lessons: [
                "Lesson 24: Using Quadratic Equations to Model Situations and Solve Problems"
              ]
            }
          }
        },
        "Unit 1: Constructions and Rigid Transformations": {
            topics: {
                "Section A: Constructions": {
                    lessons: [
                        "Lesson 1: Build It",
                        "Lesson 2: Constructing Patterns",
                        "Lesson 3: Construction Techniques 1: Perpendicular Bisectors",
                        "Lesson 4: Construction Techniques 2: Equilateral Triangles",
                        "Lesson 5: Construction Techniques 3: Perpendicular Lines and Angle Bisectors",
                        "Lesson 6: Construction Techniques 4: Parallel and Perpendicular Lines",
                        "Lesson 7: Construction Techniques 5: Squares",
                        "Lesson 8: Using Technology for Constructions",
                        "Lesson 9: Speedy Delivery"
                    ]
                },
                "Section B: Defining Rigid Transformations": {
                    lessons: [
                        "Lesson 10: Rigid Transformations",
                        "Lesson 11: Defining Reflections",
                        "Lesson 12: Defining Translations",
                        "Lesson 13: Incorporating Rotations",
                        "Lesson 14: Defining Rotations"
                    ]
                },
                "Section C: Working with Rigid Transformations": {
                    lessons: [
                        "Lesson 15: Symmetry",
                        "Lesson 16: More Symmetry",
                        "Lesson 17: Working with Rigid Transformations",
                        "Lesson 18: Practicing Point-by-Point Transformations"
                    ]
                },
                "Section D: Evidence and Proof": {
                    lessons: [
                        "Lesson 19: Evidence, Angles, and Proof",
                        "Lesson 20: Transformations, Transversals, and Proof",
                        "Lesson 21: One Hundred Eighty"
                    ]
                },
                "Section E: Let's Put It to Work": {
                    lessons: [
                        "Lesson 22: Now What Can You Build?"
                    ]
                }
            }
        },
        "Unit 2: Congruence": {
            topics: {
                "Section A: Congruent Figures": {
                    lessons: [
                        "Lesson 1: Congruent Parts, Part 1",
                        "Lesson 2: Congruent Parts, Part 2",
                        "Lesson 3: Congruent Triangles, Part 1",
                        "Lesson 4: Congruent Triangles, Part 2",
                        "Lesson 5: Points, Segments, and Zigzags"
                    ]
                },
                "Section B: Triangle Congruence Theorems": {
                    lessons: [
                        "Lesson 6: Side-Angle-Side Triangle Congruence",
                        "Lesson 7: Angle-Side-Angle Triangle Congruence",
                        "Lesson 8: The Perpendicular Bisector Theorem",
                        "Lesson 9: Side-Side-Side Triangle Congruence",
                        "Lesson 10: Practicing Proofs",
                        "Lesson 11: Side-Side-Angle (Sometimes) Congruence"
                    ]
                },
                "Section C: Proofs about Quadrilaterals": {
                    lessons: [
                        "Lesson 12: Proofs about Quadrilaterals",
                        "Lesson 13: Proofs about Parallelograms",
                        "Lesson 14: Bisect It"
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    lessons: [
                        "Lesson 15: Congruence for Quadrilaterals"
                    ]
                }
            }
        },
        "Unit 3: Similarity": {
            topics: {
                "Section A: Properties of Dilations": {
                    lessons: [
                        "Lesson 1: Scale Drawings",
                        "Lesson 2: Scale of the Solar System",
                        "Lesson 3: Measuring Dilations",
                        "Lesson 4: Dilating Lines and Angles",
                        "Lesson 5: Splitting Triangle Sides with Dilation (Part 1)"
                    ]
                },
                "Section B: Similarity Transformations and Proportional Reasoning": {
                    lessons: [
                        "Lesson 6: Connecting Similarity and Transformations",
                        "Lesson 7: Reasoning about Similarity with Transformations",
                        "Lesson 8: Are They All Similar?",
                        "Lesson 9: Conditions for Triangle Similarity",
                        "Lesson 10: Other Conditions for Triangle Similarity",
                        "Lesson 11: Splitting Triangle Sides with Dilation (Part 2)",
                        "Lesson 12: Practice with Proportional Relationships"
                    ]
                },
                "Section C: Similarity in Right Triangles": {
                    lessons: [
                        "Lesson 13: Using the Pythagorean Theorem and Similarity",
                        "Lesson 14: Proving the Pythagorean Theorem",
                        "Lesson 15: Converse of the Pythagorean Theorem",
                        "Lesson 16: Finding All the Unknown Values in Triangles"
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    lessons: [
                        "Lesson 17: Reflection Similarity"
                    ]
                }
            }
        },
        "Unit 4: Right Triangle Trigonometry": {
            topics: {
                "Section A: Angles and Steepness": {
                    lessons: [
                        "Lesson 1: Angles and Steepness",
                        "Lesson 2: Half a Square",
                        "Lesson 3: Half an Equilateral Triangle",
                        "Lesson 4: Ratios in Right Triangles",
                        "Lesson 5: Working with Ratios in Right Triangles"
                    ]
                },
                "Section B: Defining Trigonometric Ratios": {
                    lessons: [
                        "Lesson 6: Working with Trigonometric Ratios",
                        "Lesson 7: Applying Ratios in Right Triangles",
                        "Lesson 8: Sine and Cosine in the Same Right Triangle",
                        "Lesson 9: Trigonometry Squared",
                        "Lesson 10: Using Trigonometric Ratios to Find Angles"
                    ]
                },
                "Section C: Let’s Put It to Work": {
                    lessons: [
                        "Lesson 11: Solving Problems with Trigonometry",
                        "Lesson 12: Approximating Pi"
                    ]
                }
            }
        },
        "Unit 5: Solid Geometry": {
            topics: {
                "Section A: Cross-Sections, Scaling, and Area": {
                    lessons: [
                        "Lesson 1: Solids of Rotation",
                        "Lesson 2: Slicing Solids",
                        "Lesson 3: Creating Cross-Sections by Dilating",
                        "Lesson 4: Scaling and Area",
                        "Lesson 5: Scaling and Unscaling"
                    ]
                },
                "Section B: Scaling Solids": {
                    lessons: [
                        "Lesson 6: Scaling Solids",
                        "Lesson 7: The Root of the Problem",
                        "Lesson 8: Speaking of Scaling"
                    ]
                },
                "Section C: Prism and Cylinder Volumes": {
                    lessons: [
                        "Lesson 9: Cylinder Volumes",
                        "Lesson 10: Cross-Sections and Volume",
                        "Lesson 11: Prisms Practice"
                    ]
                },
                "Section D: Understanding Pyramid Volumes": {
                    lessons: [
                        "Lesson 12: Prisms and Pyramids",
                        "Lesson 13: Building a Volume Formula for a Pyramid",
                        "Lesson 14: Working with Pyramids",
                        "Lesson 15: Putting All the Solids Together"
                    ]
                },
                "Section E: Let’s Put It to Work": {
                    lessons: [
                        "Lesson 16: Surface Area and Volume",
                        "Lesson 17: Volume and Density",
                        "Lesson 18: Volume and Graphing"
                    ]
                }
            }
        },
        "Unit 6: Coordinate Geometry": {
            topics: {
                "Section A: Transformations in the Plane": {
                    lessons: [
                        "Lesson 1: Rigid Transformations in a Plane",
                        "Lesson 2: Transformations as Functions",
                        "Lesson 3: Types of Transformations"
                    ]
                },
                "Section B: Distances, Circles, and Parabolas": {
                    lessons: [
                        "Lesson 4: Distances and Circles",
                        "Lesson 5: Squares and Circles",
                        "Lesson 6: Completing the Square",
                        "Lesson 7: Distances and Parabolas",
                        "Lesson 8: Equations and Graphs"
                    ]
                },
                "Section C: Proving Geometric Theorems Algebraically": {
                    lessons: [
                        "Lesson 9: Equations of Lines",
                        "Lesson 10: Parallel Lines in the Plane",
                        "Lesson 11: Perpendicular Lines in the Plane",
                        "Lesson 12: It’s All on the Line",
                        "Lesson 13: Intersection Points",
                        "Lesson 14: Coordinate Proof",
                        "Lesson 15: Weighted Averages",
                        "Lesson 16: Weighted Averages in a Triangle",
                        "Lesson 17: Lines in Triangles"
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    lessons: [
                        "Lesson 18: Applying Area and Perimeter on the Plane"
                    ]
                }
            }
        },
        "Unit 7: Circles": {
            topics: {
                "Section A: Lines, Angles, and Circles": {
                    lessons: [
                        "Lesson 1: Lines, Angles, and Curves",
                        "Lesson 2: Inscribed Angles",
                        "Lesson 3: Tangent Lines"
                    ]
                },
                "Section B: Polygons and Circles": {
                    lessons: [
                        "Lesson 4: Quadrilaterals in Circles",
                        "Lesson 5: Triangles in Circles",
                        "Lesson 6: A Special Point",
                        "Lesson 7: Circles in Triangles"
                    ]
                },
                "Section C: Measuring Circles": {
                    lessons: [
                        "Lesson 8: Arcs and Sectors",
                        "Lesson 9: Part to Whole",
                        "Lesson 10: Angles, Arcs, and Radii",
                        "Lesson 11: A New Way to Measure Angles",
                        "Lesson 12: Radian Sense",
                        "Lesson 13: Using Radians"
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    lessons: [
                        "Lesson 14: Putting It All Together"
                    ]
                }
            }
        },
        "Unit 8: Conditional Probability": {
          topics: {
            "Section A: Up to Chance": {
              lessons: [
                "Lesson 1: Up to Chance",
                "Lesson 2: Playing with Probability",
                "Lesson 3: Sample Spaces",
                "Lesson 4: Tables of Relative Frequencies",
                "Lesson 5: Combining Events",
                "Lesson 6: The Addition Rule"
              ]
            },
            "Section B: Related Events": {
              lessons: [
                "Lesson 7: Related Events",
                "Lesson 8: Conditional Probability",
                "Lesson 9: Using Tables for Conditional Probability",
                "Lesson 10: Using Probability to Determine Whether Events Are Independent"
              ]
            },
            "Section C: Let's Put It to Work": {
              lessons: [
                "Lesson 11: Probabilities in Games"
              ]
            }
          }
        }
      }
    }
  }
};
