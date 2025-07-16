
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

export const healthCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Unit 1: Foundations of Health & Wellness": {
            unit: "Unit 1: Foundations of Health & Wellness",
            topics: {
                "Daily Lessons": {
                    topic: "Daily Lessons",
                    lessons: [
                        { title: "Day 1: Introduction to Health & Wellness", objective: "Define health and wellness and identify the five dimensions of health (physical, mental/emotional, social, spiritual, environmental)." },
                        { title: "Day 2: The Health Continuum", objective: "Understand the concept of the health continuum and recognize that health is dynamic." },
                        { title: "Day 3: Influences on Health - Part 1 (Internal)", objective: "Identify internal factors that influence health (e.g., heredity, attitudes, knowledge)." },
                        { title: "Day 4: Influences on Health - Part 2 (External)", objective: "Identify external factors that influence health (e.g., environment, media, technology, peers, culture)." },
                        { title: "Day 5: Health Skills: Accessing Valid Information", objective: "Learn to identify reliable sources of health information and evaluate their credibility." },
                        { title: "Day 6: Health Skills: Communication & Advocacy", objective: "Practice effective communication skills for health promotion and advocacy." },
                        { title: "Day 7: Health Skills: Decision-Making Model", objective: "Apply a step-by-step decision-making model to health-related choices." },
                        { title: "Day 8: Health Skills: Goal Setting (SMART Goals)", objective: "Understand the importance of setting SMART (Specific, Measurable, Achievable, Relevant, Time-bound) health goals." },
                        { title: "Day 9: Risk Behaviors and Protective Factors", objective: "Differentiate between risk behaviors and protective factors and their impact on health." },
                        { title: "Day 10: Unit 1 Review & Assessment", objective: "Demonstrate understanding of foundational health concepts and skills." }
                    ]
                }
            }
        },
        "Unit 2: Mental and Emotional Health": {
            unit: "Unit 2: Mental and Emotional Health",
            topics: {
                "Daily Lessons": {
                    topic: "Daily Lessons",
                    lessons: [
                        { title: "Day 11: Understanding Mental & Emotional Health", objective: "Define mental and emotional health and discuss their importance." },
                        { title: "Day 12: Building Self-Esteem and Self-Concept", objective: "Identify factors that contribute to self-esteem and strategies for improving it." },
                        { title: "Day 13: Understanding Emotions", objective: "Identify and express a wide range of emotions in healthy ways." },
                        { title: "Day 14: Stress: Causes and Effects", objective: "Identify common stressors for teens and understand the physical and mental effects of stress." },
                        { title: "Day 15: Stress Management Techniques - Part 1", objective: "Learn and practice relaxation techniques (e.g., deep breathing, progressive muscle relaxation)." },
                        { title: "Day 16: Stress Management Techniques - Part 2", objective: "Explore other stress management strategies (e.g., time management, physical activity, hobbies)." },
                        { title: "Day 17: Resiliency and Coping Skills", objective: "Understand resilience and develop strategies for coping with adversity." },
                        { title: "Day 18: Mental Disorders: Understanding and Stigma", objective: "Learn about common mental disorders (e.g., anxiety, depression) and address the stigma surrounding them." },
                        { title: "Day 19: Eating Disorders: Awareness and Support", objective: "Understand the signs, symptoms, and dangers of common eating disorders (anorexia, bulimia, binge eating disorder)." },
                        { title: "Day 20: Suicide Prevention: Recognizing Warning Signs", objective: "Recognize warning signs of suicide and understand the importance of seeking help for oneself or others." },
                        { title: "Day 21: Seeking Help for Mental Health Concerns", objective: "Identify various resources for mental health support (e.g., school counselor, therapist, crisis hotlines)." },
                        { title: "Day 22: Building Positive Relationships", objective: "Understand the characteristics of healthy relationships and effective communication in relationships." },
                        { title: "Day 23: Conflict Resolution Skills", objective: "Learn and practice strategies for resolving conflicts peacefully and effectively." },
                        { title: "Day 24: Peer Pressure and Refusal Skills", objective: "Develop and practice refusal skills to resist negative peer pressure." },
                        { title: "Day 25: Unit 2 Review & Assessment", objective: "Demonstrate understanding of mental and emotional health concepts and skills." }
                    ]
                }
            }
        },
        "Unit 3: Nutrition and Physical Activity": {
            unit: "Unit 3: Nutrition and Physical Activity",
            topics: {
                "Daily Lessons": {
                    topic: "Daily Lessons",
                    lessons: [
                        { title: "Day 26: The Importance of Nutrition", objective: "Understand why good nutrition is essential for overall health and development." },
                        { title: "Day 27: Macronutrients: Carbohydrates, Proteins, Fats", objective: "Identify the main functions and sources of carbohydrates, proteins, and fats." },
                        { title: "Day 28: Micronutrients: Vitamins and Minerals", objective: "Identify essential vitamins and minerals and their roles in the body." },
                        { title: "Day 29: Water and Its Importance", objective: "Understand the vital role of water in the body and recommended daily intake." },
                        { title: "Day 30: Dietary Guidelines for Americans / MyPlate", objective: "Interpret and apply the Dietary Guidelines for Americans and MyPlate recommendations." },
                        { title: "Day 31: Reading Food Labels", objective: "Analyze food labels to make informed food choices (e.g., serving size, calories, nutrients, ingredients)." },
                        { title: "Day 32: Healthy Snacking and Meal Planning", objective: "Develop strategies for healthy snacking and planning balanced meals." },
                        { title: "Day 33: Understanding Body Image and Media Influence", objective: "Discuss the concept of body image and how media influences perceptions of ideal body types." },
                        { title: "Day 34: The Benefits of Physical Activity", objective: "Understand the physical, mental, and social benefits of regular physical activity." },
                        { title: "Day 35: Components of Fitness", objective: "Identify the five components of fitness (cardiorespiratory endurance, muscular strength, muscular endurance, flexibility, body composition)." },
                        { title: "Day 36: Designing a Personal Fitness Plan", objective: "Create a basic personal fitness plan incorporating different types of physical activity." },
                        { title: "Day 37: Safety in Physical Activity", objective: "Identify safety precautions for various physical activities and prevent common injuries." },
                        { title: "Day 38: Sedentary Lifestyles and Screen Time", objective: "Understand the health risks associated with sedentary lifestyles and excessive screen time." },
                        { title: "Day 39: Balancing Energy Intake and Expenditure", objective: "Understand the concept of energy balance and its role in weight management." },
                        { title: "Day 40: Unit 3 Review & Assessment", objective: "Demonstrate understanding of nutrition and physical activity concepts and skills." }
                    ]
                }
            }
        },
        "Unit 4: Substance Use and Abuse": {
            unit: "Unit 4: Substance Use and Abuse",
            topics: {
                "Daily Lessons": {
                    topic: "Daily Lessons",
                    lessons: [
                        { title: "Day 41: Introduction to Psychoactive Substances", objective: "Define psychoactive substances, drug use, misuse, and abuse." },
                        { title: "Day 42: Factors Influencing Substance Use", objective: "Identify internal and external factors that influence an individual's decision to use or not use substances." },
                        { title: "Day 43: Alcohol: Short-Term Effects", objective: "Understand the immediate physiological and psychological effects of alcohol on the body and mind." },
                        { title: "Day 44: Alcohol: Long-Term Effects & Alcoholism", objective: "Identify the long-term health consequences of alcohol abuse and the characteristics of alcoholism." },
                        { title: "Day 45: Alcohol: Legal & Social Consequences", objective: "Understand the legal ramifications (e.g., DWI/DUI) and social consequences of underage drinking and alcohol abuse." },
                        { title: "Day 46: Tobacco: Nicotine and Its Effects", objective: "Identify nicotine as the addictive substance in tobacco and understand its immediate effects." },
                        { title: "Day 47: Tobacco: Health Risks of Smoking & Vaping", objective: "Understand the long-term health risks associated with smoking (e.g., cancer, heart disease) and the emerging risks of vaping/e-cigarettes." },
                        { title: "Day 48: Tobacco: Secondhand Smoke & Cessation", objective: "Understand the dangers of secondhand smoke and identify resources for quitting tobacco." },
                        { title: "Day 49: Marijuana: Effects and Risks", objective: "Understand the short-term and long-term effects of marijuana use, including its impact on brain development and mental health." },
                        { title: "Day 50: Opioids: Prescription Drug Abuse & Heroin", objective: "Understand the dangers of opioid addiction, including prescription painkiller abuse and heroin." },
                        { title: "Day 51: Stimulants & Depressants", objective: "Identify common stimulants (e.g., cocaine, methamphetamine) and depressants (e.g., tranquilizers) and their effects." },
                        { title: "Day 52: Hallucinogens & Inhalants", objective: "Understand the effects and risks associated with hallucinogens (e.g., LSD, ecstasy) and inhalants." },
                        { title: "Day 53: Addiction: The Disease Model", objective: "Understand addiction as a chronic brain disease and its impact on individuals and families." },
                        { title: "Day 54: Prevention Strategies: Education & Awareness", objective: "Explore various drug prevention strategies and the role of education." },
                        { title: "Day 55: Refusal Skills: Saying No Effectively", objective: "Practice assertive refusal skills in various scenarios involving substance offers." },
                        { title: "Day 56: Intervention and Seeking Help for Substance Abuse", objective: "Identify signs that someone may need help with substance abuse and resources for intervention and treatment." },
                        { title: "Day 57: The Role of Law Enforcement and Community", objective: "Understand the role of law enforcement in addressing substance abuse and community-based prevention efforts." },
                        { title: "Day 58: Impaired Driving & Consequences", objective: "Understand the dangers and legal consequences of driving under the influence of alcohol or drugs." },
                        { title: "Day 59: Resisting Pressure from Media and Marketing", objective: "Analyze how media and marketing influence perceptions of substance use and develop strategies to resist these pressures." },
                        { title: "Day 60: Unit 4 Review & Assessment", objective: "Demonstrate comprehensive understanding of substance use and abuse, prevention, and intervention." }
                    ]
                }
            }
        },
        "Unit 5: Disease Prevention and Control": {
            unit: "Unit 5: Disease Prevention and Control",
            topics: {
                "Daily Lessons": {
                    topic: "Daily Lessons",
                    lessons: [
                        { title: "Day 61: Introduction to Disease", objective: "Define disease, differentiate between communicable and non-communicable diseases." },
                        { title: "Day 62: The Immune System", objective: "Understand the basic functions of the immune system in fighting off pathogens." },
                        { title: "Day 63: Communicable Diseases: Transmission & Prevention", objective: "Identify common communicable diseases (e.g., colds, flu, strep throat) and modes of transmission." },
                        { title: "Day 64: Vaccinations and Immunization", objective: "Understand the importance of vaccinations in preventing communicable diseases and herd immunity." },
                        { title: "Day 65: Personal Hygiene Practices", objective: "Reinforce the importance of good personal hygiene (e.g., handwashing, dental care, showering) in preventing disease." },
                        { title: "Day 66: Non-Communicable Diseases: Risk Factors", objective: "Identify common non-communicable diseases (e.g., heart disease, cancer, diabetes) and their modifiable and non-modifiable risk factors." },
                        { title: "Day 67: Cardiovascular Disease Prevention", objective: "Understand the causes and prevention strategies for heart disease and stroke (e.g., healthy diet, exercise, managing stress)." },
                        { title: "Day 68: Cancer Prevention", objective: "Understand common types of cancer, risk factors, and prevention strategies (e.g., sun protection, healthy diet, avoiding tobacco)." },
                        { title: "Day 69: Diabetes Prevention & Management", objective: "Understand Type 1 and Type 2 diabetes, risk factors, and strategies for prevention and management." },
                        { title: "Day 70: Unit 5 Review & Assessment", objective: "Demonstrate understanding of disease prevention and control." }
                    ]
                }
            }
        },
        "Unit 6: Personal Safety and Injury Prevention": {
            unit: "Unit 6: Personal Safety and Injury Prevention",
            topics: {
                "Daily Lessons": {
                    topic: "Daily Lessons",
                    lessons: [
                        { title: "Day 71: Introduction to Safety & Injury Prevention", objective: "Understand the importance of personal safety and common causes of unintentional injuries." },
                        { title: "Day 72: Home Safety", objective: "Identify safety hazards in the home (e.g., fire, poison, falls) and prevention strategies." },
                        { title: "Day 73: Road Safety: Pedestrian, Bicycle, and Driver Safety", objective: "Understand rules and precautions for pedestrian, bicycle, and passenger safety, including seatbelt use." },
                        { title: "Day 74: Water Safety", objective: "Identify water safety rules and risks associated with swimming, boating, and other water activities." },
                        { title: "Day 75: Online Safety & Cyberbullying", objective: "Understand the risks of online interactions (e.g., privacy, predators) and strategies to prevent cyberbullying." },
                        { title: "Day 76: Violence Prevention: Bullying & Harassment", objective: "Define bullying and harassment, recognize their forms, and learn strategies for prevention and intervention." },
                        { title: "Day 77: Conflict Resolution & De-escalation", objective: "Learn non-violent strategies for resolving conflicts and de-escalating tense situations." },
                        { title: "Day 78: Basic First Aid Principles", objective: "Understand the basic principles of first aid for common injuries (e.g., cuts, burns, sprains)." },
                        { title: "Day 79: Emergency Preparedness", objective: "Understand the importance of preparing for emergencies (e.g., natural disasters, power outages) and creating an emergency plan." },
                        { title: "Day 80: Unit 6 Review & Assessment", objective: "Demonstrate understanding of personal safety and injury prevention." }
                    ]
                }
            }
        },
        "Unit 7: Consumer Health and Health Careers": {
            unit: "Unit 7: Consumer Health and Health Careers",
            topics: {
                "Daily Lessons": {
                    topic: "Daily Lessons",
                    lessons: [
                        { title: "Day 81: Evaluating Health Information", objective: "Develop critical thinking skills to evaluate the reliability and validity of health information from various sources (e.g., internet, advertisements)." },
                        { title: "Day 82: Health Products and Services", objective: "Understand how to make informed decisions when purchasing health products and services." },
                        { title: "Day 83: Consumer Rights and Responsibilities", objective: "Understand basic consumer rights related to health products and services and how to report fraudulent practices." },
                        { title: "Day 84: Exploring Health Careers", objective: "Identify a variety of health-related career paths and the education/training required for them." },
                        { title: "Day 85: Unit 7 Review & Assessment", objective: "Demonstrate understanding of consumer health and health careers." }
                    ]
                }
            }
        },
        "Unit 8: Relationships and Sexual Health": {
            unit: "Unit 8: Relationships and Sexual Health",
            topics: {
                "Daily Lessons": {
                    topic: "Daily Lessons",
                    lessons: [
                        { title: "Day 86: Healthy Relationships: Communication & Respect", objective: "Identify characteristics of healthy relationships (e.g., trust, respect, communication, equality) and unhealthy relationships." },
                        { title: "Day 87: Consent and Boundaries", objective: "Understand the importance of consent in all relationships and how to establish and respect personal boundaries." },
                        { title: "Day 88: Reproductive Health Basics (Age-Appropriate)", objective: "Understand the basic anatomy and physiology of the male and female reproductive systems and the process of reproduction." },
                        { title: "Day 89: Sexually Transmitted Infections (STIs) & Prevention", objective: "Identify common STIs, their modes of transmission, symptoms, and prevention strategies." },
                        { title: "Day 90: Contraception & Responsible Choices (Age-Appropriate)", objective: "Understand various methods of contraception and the importance of responsible decision-making regarding sexual activity." }
                    ]
                }
            }
        }
    }
};
