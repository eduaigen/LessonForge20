
type Lesson = {
    title: string;
    objective: string;
};

type Week = {
    week: string;
    lessons: Lesson[];
};

type Unit = {
    unit: string;
    weeks: { [key: string]: Week };
};

type Quarter = {
    quarter: string;
    units: { [key: string]: Unit };
};

export const anatomyPhysiologyCurriculum: {
    quarters: { [key: string]: Quarter };
} = {
    quarters: {
        "First Quarter: Introduction to the Body, Chemistry & Cells, Body Tissues, Integument System": {
            quarter: "First Quarter: Introduction to the Body, Chemistry & Cells, Body Tissues, Integument System",
            units: {
                "Unit 1: Lab Safety & Introduction to the Body": {
                    unit: "Unit 1: Lab Safety & Introduction to the Body",
                    weeks: {
                        "Week 1: Lab Safety & Scientific Method": {
                            week: "Week 1: Lab Safety & Scientific Method",
                            lessons: [
                                { title: "Day 1: Introduction to A&P and Lab Safety", objective: "Students will be able to identify key lab safety rules and procedures." },
                                { title: "Day 2: Scientific Method Review", objective: "Students will be able to define the components of the scientific method and formulate a hypothesis." },
                                { title: "Day 3-4: Autopsy of a Dill Pickle Lab", objective: "Students will be able to apply anatomical directional terms and properly use dissecting tools." },
                                { title: "Day 5: Flinn Safety Quiz & Discussion", objective: "Students will achieve at least 80% on the Flinn Safety Quiz and participate in a discussion on lab safety implications." }
                            ]
                        },
                        "Week 2: Structural Organization & Life Functions": {
                            week: "Week 2: Structural Organization & Life Functions",
                            lessons: [
                                { title: "Day 1: Levels of Structural Organization", objective: "Students will be able to list and describe the levels of organization from chemical to organismal." },
                                { title: "Day 2: Life Functions & Needs", objective: "Students will be able to describe at least five life functions and needs, such as movement, responsiveness, and reproduction." },
                                { title: "Day 3: Homeostasis & Feedback Loops", objective: "Students will be able to differentiate between positive and negative feedback loops and provide examples." },
                                { title: "Day 4: Anatomical Terminology - Regional & Directional", objective: "Students will be able to define and apply common regional and directional anatomical terms." },
                                { title: "Day 5: Body Planes & Cavities; Vocabulary Quiz", objective: "Students will be able to identify major body planes and cavities and pass a vocabulary quiz on introductory terms." }
                            ]
                        }
                    }
                },
                "Unit 2: Chemistry & Cells": {
                    unit: "Unit 2: Chemistry & Cells",
                    weeks: {
                        "Week 3: Basic Chemistry & Enzymes": {
                            week: "Week 3: Basic Chemistry & Enzymes",
                            lessons: [
                                { title: "Day 1: Basic Molecular Structures (Macromolecules)", objective: "Students will be able to describe the basic structures and functions of carbohydrates and lipids." },
                                { title: "Day 2: Proteins & Nucleic Acids", objective: "Students will be able to describe the structures of proteins and amino acids, and explain the functions of proteins." },
                                { title: "Day 3: Introduction to Enzymes", objective: "Students will be able to define an enzyme and explain its function as a catalyst." },
                                { title: "Day 4: Factors Affecting Enzyme Activity", objective: "Students will be able to identify and explain the effects of pH and temperature on enzyme activity." },
                                { title: "Day 5: Enzyme Lab & Discussion", objective: "Students will conduct an enzyme lab and analyze its results in a discussion." }
                            ]
                        },
                        "Week 4: Cells, Cell Division & Transport": {
                            week: "Week 4: Cells, Cell Division & Transport",
                            lessons: [
                                { title: "Day 1: Plant vs. Animal Cells", objective: "Students will be able to identify key organelles present in animal cells." },
                                { title: "Day 2: Cell Cycle & Mutations", objective: "Students will be able to describe the phases of the cell cycle and the concept of a mutation." },
                                { title: "Day 3: Cancer - Uncontrolled Cell Growth", objective: "Students will be able to describe how uncontrolled cell growth can lead to cancer." },
                                { title: "Day 4: Membrane Transport - Passive Processes", objective: "Students will be able to explain the processes of diffusion and osmosis." },
                                { title: "Day 5: Membrane Transport - Active Processes & Cell Lab", objective: "Students will be able to explain active transport and observe cheek cells under a microscope." }
                            ]
                        }
                    }
                },
                "Unit 3: Body Tissues & Integumentary System": {
                    unit: "Unit 3: Body Tissues & Integumentary System",
                    weeks: {
                        "Week 5: Body Tissues": {
                            week: "Week 5: Body Tissues",
                            lessons: [
                                { title: "Day 1: Epithelial Tissue", objective: "Students will be able to classify and describe the defining characteristics of epithelial tissue." },
                                { title: "Day 2: Connective Tissue", objective: "Students will be able to describe the general characteristics and various types of connective tissue." },
                                { title: "Day 3: Muscle Tissue", objective: "Students will be able to differentiate between skeletal, cardiac, and smooth muscle tissue." },
                                { title: "Day 4: Nervous Tissue & Tissue Microscope Lab", objective: "Students will be able to describe the structure and function of neurons and neuroglia, and observe prepared tissue slides." },
                                { title: "Day 5: Endocrine vs. Exocrine Glands; Vocabulary Quiz & Chapter Test", objective: "Students will be able to define endocrine and exocrine glands and perform well on quizzes covering tissues and basic chemistry/cells." }
                            ]
                        },
                        "Week 6: Integumentary System": {
                            week: "Week 6: Integumentary System",
                            lessons: [
                                { title: "Day 1: Structure of the Skin", objective: "Students will be able to identify the epidermis, dermis, and hypodermis and their key features." },
                                { title: "Day 2: Functions of the Integumentary System", objective: "Students will be able to describe at least three functions of the integumentary system, such as protection and temperature regulation." },
                                { title: "Day 3: Accessory Structures of the Skin", objective: "Students will be able to describe the structure and function of hair and nails." },
                                { title: "Day 4: Skin Diseases & Disorders", objective: "Students will be able to list and briefly describe common skin diseases." },
                                { title: "Day 5: Skin Disease Pamphlet Project", objective: "Students will create an informative pamphlet on a chosen skin disease, including its symptoms, causes, and treatments." }
                            ]
                        }
                    }
                }
            }
        },
        "Second Quarter: Skeletal System, Muscular System, Nervous System": {
            quarter: "Second Quarter: Skeletal System, Muscular System, Nervous System",
            units: {
                "Unit 4: Skeletal System": {
                    unit: "Unit 4: Skeletal System",
                    weeks: {
                        "Week 7: Bone Tissue & Axial Skeleton": {
                            week: "Week 7: Bone Tissue & Axial Skeleton",
                            lessons: [
                                { title: "Day 1: Introduction to the Skeletal System & Bone Functions", objective: "Students will be able to list and describe the key functions of bones, such as support, protection, and movement." },
                                { title: "Day 2: Anatomy & Histology of Bone Tissue", objective: "Students will be able to describe the composition and types of bone tissue." },
                                { title: "Day 3: Bone Formation & Maintenance", objective: "Students will be able to explain how bones are formed and maintained." },
                                { title: "Day 4: Axial Skeleton - Cranium & Vertebral Column", objective: "Students will be able to identify the bones of the skull and the regions of the vertebral column." },
                                { title: "Day 5: Axial Skeleton - Thoracic Cage & The Skeletal Challenge", objective: "Students will be able to identify the ribs and sternum, and participate in 'The Skeletal Challenge' to build and label a skeleton." }
                            ]
                        },
                        "Week 8: Appendicular Skeleton & Bone Disorders": {
                            week: "Week 8: Appendicular Skeleton & Bone Disorders",
                            lessons: [
                                { title: "Day 1: Pectoral Girdle & Upper Limbs", objective: "Students will be able to identify the clavicle, scapula, humerus, ulna, and radius." },
                                { title: "Day 2: Pelvic Girdle & Lower Limbs", objective: "Students will be able to identify the pelvic girdle, femur, tibia, and fibula." },
                                { title: "Day 3: Joints (Articulations)", objective: "Students will be able to classify joints based on their structure and function." },
                                { title: "Day 4: Skeletal System Diseases & Disorders", objective: "Students will be able to describe at least two diseases associated with the skeletal system." },
                                { title: "Day 5: Bone Practical & Vocabulary Quiz", objective: "Students will be able to identify major bones on models or diagrams, and perform well on a vocabulary quiz." }
                            ]
                        }
                    }
                },
                "Unit 5: Muscular System": {
                    unit: "Unit 5: Muscular System",
                    weeks: {
                        "Week 9: Muscle Tissue & Contraction": {
                            week: "Week 9: Muscle Tissue & Contraction",
                            lessons: [
                                { title: "Day 1: Introduction to Muscle Tissue Types", objective: "Students will be able to describe the characteristics and locations of the three types of muscle tissue." },
                                { title: "Day 2: Microscopic Anatomy of Skeletal Muscle", objective: "Students will be able to identify key components of a skeletal muscle fiber." },
                                { title: "Day 3: Muscle Contraction - Sliding Filament Theory (Part 1)", objective: "Students will be able to explain the basic steps of the sliding filament theory." },
                                { title: "Day 4: Muscle Contraction - Sliding Filament Theory (Part 2) & Myoneural Junction", objective: "Students will be able to describe signal transmission across a myoneural junction." },
                                { title: "Day 5: Makin' Muscles Activity", objective: "Students will create a muscle model that includes a cross-section showing epimysium, perimysium, endomysium, fascicle, fiber, myofibril, and tendon." }
                            ]
                        },
                        "Week 10: Muscle Identification & Physiology": {
                            week: "Week 10: Muscle Identification & Physiology",
                            lessons: [
                                { title: "Day 1: Major Muscles of the Head & Neck", objective: "Students will be able to locate and name major muscles on a model or diagram." },
                                { title: "Day 2: Major Muscles of the Trunk & Upper Limbs", objective: "Students will be able to locate and name major muscles of the trunk and upper limbs." },
                                { title: "Day 3: Major Muscles of the Lower Limbs", objective: "Students will be able to locate and name major muscles of the lower limbs." },
                                { title: "Day 4: Muscle Physiology - Fatigue & Tone", objective: "Students will be able to describe muscle fatigue and the concept of muscle tone." },
                                { title: "Day 5: Muscle Fatigue Activity & Chapter Test", objective: "Students will participate in a muscle fatigue activity and demonstrate understanding on the chapter test." }
                            ]
                        }
                    }
                },
                "Unit 6: Nervous System": {
                    unit: "Unit 6: Nervous System",
                    weeks: {
                        "Week 11: Central Nervous System": {
                            week: "Week 11: Central Nervous System",
                            lessons: [
                                { title: "Day 1: Introduction to the Nervous System & Divisions", objective: "Students will be able to identify the major divisions of the nervous system (CNS and PNS)." },
                                { title: "Day 2: Anatomy of the Brain - Major Parts", objective: "Students will be able to identify the major parts of the brain on diagrams or models." },
                                { title: "Day 3: Functions of the Brain & Spinal Cord", objective: "Students will be able to describe the major functions of the spinal cord." },
                                { title: "Day 4: Cells of the Nervous System - Neurons & Neuroglia", objective: "Students will be able to describe the anatomy and histology of neurons and neuroglia." },
                                { title: "Day 5: Neuron Models & Brain Dissection Prep", objective: "Students will construct or analyze neuron models and identify structures on dissection diagrams." }
                            ]
                        },
                        "Week 12: Peripheral Nervous System & Senses": {
                            week: "Week 12: Peripheral Nervous System & Senses",
                            lessons: [
                                { title: "Day 1: Nerve Impulse Transmission - Action Potentials", objective: "Students will be able to describe the process of an action potential." },
                                { title: "Day 2: Synapse & Signal Transmission", objective: "Students will be able to identify the general parts of a synapse and describe signal transmission." },
                                { title: "Day 3: Reflex Arcs", objective: "Students will be able to identify the parts of a reflex arc and trace a reflex pathway." },
                                { title: "Day 4: Autonomic Nervous System - Sympathetic & Parasympathetic", objective: "Students will be able to identify the major functions associated with these divisions." },
                                { title: "Day 5: Sense Organs - Structure to Function & Senses Lab", objective: "Students will describe the structure of vertebrate sensory organs and participate in a senses lab." }
                            ]
                        }
                    }
                }
            }
        },
        "Third Quarter: Endocrine, Blood, Circulatory System, Lymphatic System & Body Defenses": {
            quarter: "Third Quarter: Endocrine, Blood, Circulatory System, Lymphatic System & Body Defenses",
            units: {
                "Unit 7: Endocrine System & Blood": {
                    unit: "Unit 7: Endocrine System & Blood",
                    weeks: {
                        "Week 13: Endocrine System": {
                            week: "Week 13: Endocrine System",
                            lessons: [
                                { title: "Day 1: Introduction to Endocrine Glands & Hormones", objective: "Students will be able to name key endocrine glands and their secreted hormones." },
                                { title: "Day 2: Endocrine vs. Neural Controls of Physiology", objective: "Students will be able to compare endocrine and neural controls of physiology." },
                                { title: "Day 3: Mechanisms of Hormone Action & Feedback Control", objective: "Students will be able to explain negative and positive feedback in hormone regulation." },
                                { title: "Day 4: Endocrine Disorders", objective: "Students will be able to describe at least two common endocrine disorders (e.g., diabetes mellitus, goiter)." },
                                { title: "Day 5: 'You are the Doctor' Project", objective: "Students will research a specific endocrine disorder and present their findings to peers." }
                            ]
                        },
                        "Week 14: Blood Composition & Hemostasis": {
                            week: "Week 14: Blood Composition & Hemostasis",
                            lessons: [
                                { title: "Day 1: Composition of Blood - Plasma & Formed Elements", objective: "Students will be able to describe the composition of plasma and the types of formed elements." },
                                { title: "Day 2: Physiology of Formed Elements", objective: "Students will be able to explain the primary roles of erythrocytes, leukocytes, and thrombocytes." },
                                { title: "Day 3: Hemostasis - Steps & Coagulation", objective: "Students will be able to describe the steps involved in hemostasis, including the mechanism of coagulation." },
                                { title: "Day 4: Blood Typing & Transfusion Reactions", objective: "Students will be able to explain the basis for blood typing and the risks of transfusion reactions." },
                                { title: "Day 5: Dracula's Dilemma (Blood Compatibility Lab)", objective: "Students will perform a simulated blood typing lab and record safe/unsafe transfusion results." }
                            ]
                        }
                    }
                },
                "Unit 8: Circulatory & Lymphatic Systems": {
                    unit: "Unit 8: Circulatory & Lymphatic Systems",
                    weeks: {
                        "Week 15: Anatomy of the Heart & Circulation": {
                            week: "Week 15: Anatomy of the Heart & Circulation",
                            lessons: [
                                { title: "Day 1: Anatomy of the Heart", objective: "Students will be able to label the main structures of the heart on a diagram or model." },
                                { title: "Day 2: Blood Flow Through the Heart & Pulmonary Circulation", objective: "Students will be able to describe the pathway of blood through the heart and pulmonary circuit." },
                                { title: "Day 3: Systemic Circulation", objective: "Students will be able to outline the systemic circulation pathway." },
                                { title: "Day 4: Hepatic Portal & Arterial Supply to the Brain", objective: "Students will be able to describe the hepatic portal circulation and major arteries supplying the brain." },
                                { title: "Day 5: Fetal Circulation & Changes at Birth", objective: "Students will be able to describe fetal circulation and the changes that occur at birth." }
                            ]
                        },
                        "Week 16: Physiology of Circulation & Lymphatic System": {
                            week: "Week 16: Physiology of Circulation & Lymphatic System",
                            lessons: [
                                { title: "Day 1: Cardiac Cycle & Heart Sounds", objective: "Students will be able to describe the cardiac cycle and explain the normal heart sounds." },
                                { title: "Day 2: Factors Affecting Blood Flow & Hypertension", objective: "Students will be able to describe factors affecting blood flow and explain hypertension." },
                                { title: "Day 3: Heart Dissection", objective: "Students will identify major structures during a heart dissection." },
                                { title: "Day 4: Lymphatic Structure & Function", objective: "Students will be able to describe the anatomy and physiology of the lymph system." },
                                { title: "Day 5: Nonspecific Body Defenses", objective: "Students will be able to describe components of nonspecific immunity (e.g., skin, mucous membranes, inflammatory response)." }
                            ]
                        },
                        "Week 17: Immune System": {
                            week: "Week 17: Immune System",
                            lessons: [
                                { title: "Day 1: Specific Body Defenses - Lymphocytes & Antibodies", objective: "Students will be able to explain the roles of lymphocytes and antibodies in specific immunity." },
                                { title: "Day 2: Macrophages & Immune Response Overview", objective: "Students will be able to describe the basic functions of the human immune system." },
                                { title: "Day 3: Vaccines & Antibiotics", objective: "Students will be able to explain the difference between vaccines and antibiotics." },
                                { title: "Day 4: Diseases of the Lymphatic/Immune System", objective: "Students will be able to describe at least one disease associated with the lymphatic or immune system." },
                                { title: "Day 5: Quarter 3 Review & Test", objective: "Students will review key concepts and demonstrate understanding on the quarter test." }
                            ]
                        }
                    }
                }
            }
        },
        "Fourth Quarter: Respiration, Digestive System, Urinary System, Reproductive System": {
            quarter: "Fourth Quarter: Respiration, Digestive System, Urinary System, Reproductive System",
            units: {
                "Unit 9: Respiratory & Digestive Systems": {
                    unit: "Unit 9: Respiratory & Digestive Systems",
                    weeks: {
                        "Week 19: Respiratory System": {
                            week: "Week 19: Respiratory System",
                            lessons: [
                                { title: "Day 1: Structure of the Respiratory System", objective: "Students will be able to label the pharynx, larynx, bronchi, and alveoli on a diagram." },
                                { title: "Day 2: Physiology of Ventilation - Breathing Mechanics", objective: "Students will be able to describe the mechanisms of ventilation." },
                                { title: "Day 3: Gas Exchange - External & Internal Respiration", objective: "Students will be able to differentiate between external and internal respiration." },
                                { title: "Day 4: Gas Transport in Blood", objective: "Students will be able to describe how oxygen and carbon dioxide are transported." },
                                { title: "Day 5: Respiratory Model Activity & Exhaling CO2 Lab", objective: "Students will create a respiratory model and perform an exhaling CO2 lab." }
                            ]
                        },
                        "Week 20: Digestive System - Anatomy & Mechanical Digestion": {
                            week: "Week 20: Digestive System - Anatomy & Mechanical Digestion",
                            lessons: [
                                { title: "Day 1: Structure of the Alimentary Canal & Accessory Organs", objective: "Students will be able to label the major organs of the digestive system." },
                                { title: "Day 2: Mechanical Digestion & Peristalsis", objective: "Students will be able to describe mechanical digestion and the process of peristalsis." },
                                { title: "Day 3: Chemical Digestion - Enzymes & Nutrient Breakdown", objective: "Students will be able to explain the role of enzymes in chemical digestion." },
                                { title: "Day 4: Absorption of Nutrients", objective: "Students will be able to describe the process of nutrient absorption in the small intestine." },
                                { title: "Day 5: Neural & Hormonal Control of Digestion & Digestive System Project", objective: "Students will be able to explain the neural and hormonal controls of digestion, and begin a digestive system project." }
                            ]
                        }
                    }
                },
                "Unit 10: Urinary & Reproductive Systems": {
                    unit: "Unit 10: Urinary & Reproductive Systems",
                    weeks: {
                        "Week 21: Urinary System": {
                            week: "Week 21: Urinary System",
                            lessons: [
                                { title: "Day 1: Structure of the Urinary System", objective: "Students will be able to label the kidneys, ureters, bladder, and urethra." },
                                { title: "Day 2: Urine Formation - Glomerular Filtration", objective: "Students will be able to describe the process of filtration in the glomerulus." },
                                { title: "Day 3: Urine Formation - Tubular Reabsorption & Secretion", objective: "Students will be able to explain tubular reabsorption and secretion." },
                                { title: "Day 4: Components of Urine (Normal & Abnormal)", objective: "Students will be able to identify normal and abnormal components of urine." },
                                { title: "Day 5: Filtration Lab & Simulated Urine Lab", objective: "Students will participate in a filtration lab and a simulated urine lab." }
                            ]
                        },
                        "Week 22: Reproductive System": {
                            week: "Week 22: Reproductive System",
                            lessons: [
                                { title: "Day 1: Structure & Function of the Male Reproductive System", objective: "Students will be able to describe the basic anatomy and physiology of the male reproductive system." },
                                { title: "Day 2: Structure & Function of the Female Reproductive System", objective: "Students will be able to describe the basic anatomy and physiology of the female reproductive system." },
                                { title: "Day 3: Human Development - Fertilization & Early Stages", objective: "Students will be able to describe the process of human development from fertilization." },
                                { title: "Day 4: Pregnancy & Fetal Development (Trimesters)", objective: "Students will be able to describe major changes that occur in each trimester of pregnancy." },
                                { title: "Day 5: Reproductive System Diseases & Mammalian Dissection Prep", objective: "Students will describe at least one disease of the reproductive system and review anatomical terms for mammalian dissection." }
                            ]
                        },
                        "Week 23: Mammalian Dissection": {
                            week: "Week 23: Mammalian Dissection",
                            lessons: [
                                { title: "Day 1-5: Mammalian Dissection (e.g., Cat or Pig)", objective: "Students will be able to identify and compare anatomical structures across various body systems in a dissected mammal to those in humans." }
                            ]
                        },
                        "Week 24: Course Review & Final Assessments": {
                            week: "Week 24: Course Review & Final Assessments",
                            lessons: [
                                { title: "Day 1-4: Comprehensive Review of All Systems", objective: "Students will review and synthesize information on all major body systems covered throughout the year." },
                                { title: "Day 5: Final Exam", objective: "Students will demonstrate mastery of the course content through a comprehensive final examination." }
                            ]
                        }
                    }
                }
            }
        }
    }
};
