
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

export const physicsCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Unit 1: Energy Systems and Community Needs": {
            unit: "Unit 1: Energy Systems and Community Needs",
            topics: {
                "Lesson Set 1: How does electricity transfer through systems to power communities, and what causes instability in these systems?": {
                    topic: "Lesson Set 1: How does electricity transfer through systems to power communities, and what causes instability in these systems?",
                    lessons: [
                        { title: "LESSON 1: What can we learn from a blackout in Texas about producing reliable energy for our communities?", objective: "Explore a StoryMap about the Texas blackouts and connect to personal experiences. Develop an initial consensus model of the electricity production system when stable and during a blackout. Develop questions for a Driving Question Board (DQB) and brainstorm initial ideas for designing more reliable systems." },
                        { title: "LESSON 2: What structures in the system enable energy transfer from one source to multiple devices, buildings, and neighborhoods?", objective: "Compare photos of electrical structures in buildings. Dissect a power strip as an analog for in-wall wiring. Connect a battery and small devices. Read about ground wires and circuit breakers. Develop a model of electrical energy transfer systems." },
                        { title: "LESSON 3: Could the blackouts in Texas have been caused by a broken or short-circuited circuit?", objective: "Read about an energy crisis in Ohio and strategies to prevent short/broken circuits. Use an Engineering Design Tracker. Develop a new representation to model energy transfer in different system parts. Analyze Texas electricity demand/supply data to brainstorm next steps." },
                        { title: "LESSON 4: What makes an energy source reliable?", objective: "Use informational cards and data from the 2021 Texas energy crisis to identify the source of the supply drop. Use a Decisions Matrix to evaluate energy sources based on criteria." },
                        { title: "LESSON 5: Where does electrical energy come from?", objective: "Use diagrams of power plants to understand how they transfer energy into wires. Dissect and reverse-engineer a generator. Use compasses to investigate energy transfer between magnets and wires. Model energy transfer through fields inside generators." },
                        { title: "LESSON 6: How does energy transfer in wires?", objective: "Read about electric and magnetic fields to model energy transfer within wires. Use a simulation to explore how electrical system characteristics influence energy transfer and loss. Check results using classroom equipment." },
                        { title: "LESSON 7: What could have caused the disparities we saw in the blackouts in Texas?", objective: "Develop a model showing how insufficient supply could lead to power loss during a crisis. Test models using Electric City, observing the need to cut power to some buildings to maintain power in others. Analyze data for correlations with county-level factors and consider analysis limitations." },
                        { title: "LESSON 8: Why do design solutions affect some people differently than others?", objective: "Listen to a podcast featuring research on Texas power outage patterns using satellite data. Read about fictionalized families in Texas to consider how existing disparities cause inequitable impacts." }
                    ]
                },
                "Lesson Set 2: What design solutions could improve the electricity systems in our communities?": {
                    topic: "Lesson Set 2: What design solutions could improve the electricity systems in our communities?",
                    lessons: [
                        { title: "LESSON 9: How can energy storage make our systems more reliable during an energy crisis?", objective: "Develop and revise energy transfer models to represent how batteries improve grid reliability. Quantify energy needed to prevent the Texas crisis (2021). Use data from energy storage solutions to calculate batteries needed and associated costs. Consider non-financial costs of design solutions." },
                        { title: "LESSON 10: What decisions do we need to make to design more reliable systems to meet our community's energy needs?", objective: "Read about tradeoffs associated with energy sources. Create a class Consensus Decisions Matrix for important criteria. Read quotes from interested parties and interview community members to capture values. Begin developing a plan to improve community electricity infrastructure." },
                        { title: "LESSON 11: What have we figured out, and what can we carry forward?", objective: "Learn about the Energy Grid Calculator to measure solution success. Describe and refine design solutions based on peer feedback. Revisit the DQB and celebrate progress. Complete an assessment explaining energy transfer in a solar sand power plant and evaluating its feasibility." }
                    ]
                }
            }
        },
        "Unit 2: Earth's Dynamic Interior and Surface Features": {
            unit: "Unit 2: Earth's Dynamic Interior and Surface Features",
            topics: {
                "Lesson Set 1: How does land stretch and when/why does it break?": {
                    topic: "Lesson Set 1: How does land stretch and when/why does it break?",
                    lessons: [
                        { title: "LESSON 1: What is happening in the Afar region?", objective: "Explore a StoryMap about a giant crack in Earth's crust in the Afar region. Connect to prior earthquake experiences and local earthquakes. Read about selected earthquakes and compare them to Afar events. Develop an initial model for before, during, and after the events. Develop questions for the DQB and ideas for investigations." },
                        { title: "LESSON 2: What allows a system to remain stable when forces are acting on it, and what causes it to suddenly change?", objective: "Analyze plate motion data. Develop a model of force interactions between plates. Investigate conditions for stability and change in object motion under multiple forces. Use free-body diagrams to explain and predict impact of force magnitude on stability/change." },
                        { title: "LESSON 3: What happens to the matter and energy in a system when the magnitude of balanced forces on it increases?", objective: "Explore changes in foam with increasing forces. Develop a model relating unbalanced forces to matter changes and energy transfer. Predict if rock behaves like foam. Gather information from a reading. Ask questions about new ideas relating to Earth systems." },
                        { title: "LESSON 4: What is changing in the matter at a particle level before an earthquake, and when a solid elastically deforms or breaks?", objective: "Evaluate models for earthquakes, elastic deformation, and solid breaking. Use a computer simulation to investigate external forces on solids, matter changes, and energy transfers at the particle level. Revise M-E-F poster for fields' roles. Use ideas to explain volcanic eruptions in an Electronic Exit Ticket." },
                        { title: "LESSON 5: How do we investigate the connection between matter in Earth's interior and surface features above?", objective: "Wonder about causes of unbalanced forces on Afar's crust. Investigate how energy transfers differently through different matter types. Create a scale model to predict seismic wave travel time if Earth were solid rock. Analyze seismic data for actual travel times. Graph data to compare model with reality." },
                        { title: "LESSON 6: How is temperature related to the behavior of the matter in the mantle?", objective: "Develop a model to explain mantle material movement. Analyze a video of a tank simulating mantle matter to understand heat's effect. Observe and model convection in the tank. Compare this model to tomography data and revisit the DQB." },
                        { title: "LESSON 7: Where does the energy that drives convection come from?", objective: "Investigate the heat source for mantle convection. Jigsaw articles explaining the question from force, matter, and energy perspectives. Develop a cause-effect model integrating these perspectives to explain how radioactive decay heats the mantle." }
                    ]
                },
                "Lesson Set 2: How do forces determine what will happen on Earth's surface?": {
                    topic: "Lesson Set 2: How do forces determine what will happen on Earth's surface?",
                    lessons: [
                        { title: "LESSON 8: Is the rock at Afar radioactive, and what can that tell us?", objective: "Analyze radioactive element composition of Afar rocks. Use a simulation to collect data on radioactive material decay over time. Use mathematical thinking to compare decay patterns to exponential decay equations. Use the equation to determine Afar rock ages." },
                        { title: "LESSON 9: How does the rock in Afar compare to the rock around the world, and what does this tell us about the history and future of the region?", objective: "Look at crustal age data worldwide; observe older rock farther from some ocean plate boundaries. Model processes at these boundaries. Determine basalt and granite densities and consider their effect on forces and energy transfer. Add questions to DQB about plate boundaries and crust types." },
                        { title: "LESSON 10: What is happening at plate boundaries?", objective: "Use a simulation to investigate plate interactions at divergent and convergent boundaries. Analyze data to compare Earth's surface features to simulation features. Develop a model explaining how plate interactions create surface features. Wonder which forces act on plates to explain motion patterns." },
                        { title: "LESSON 11: How might forces between the mantle and plates affect plate motion?", objective: "Investigate variables affecting friction forces between an object and a surface. Connect conclusions to plate properties and motion." },
                        { title: "LESSON 12: How do forces act on objects, such as the plates, when they are on inclines?", objective: "Model forces on plates and investigate forces on an inclined object. Model how gravity can be split into vector components to explain downward pull on inclines. Connect this to plate motion to update the plate interactions model." },
                        { title: "LESSON 13: How can we use our science ideas to explain what happened at the Midcontinent Rift?", objective: "Revisit Scale Chart poster and DQB. Complete a transfer task comparing the Midcontinent Ridge's fate to the growing Afar rift." }
                    ]
                }
            }
        },
        "Unit 3: Collisions with Space Objects and Earth's History": {
            unit: "Unit 3: Collisions with Space Objects and Earth's History",
            topics: {
                "Lesson Set 1: What causes collisions between Earth and objects in space?": {
                    topic: "Lesson Set 1: What causes collisions between Earth and objects in space?",
                    lessons: [
                        { title: "LESSON 1: Why is stuff falling from the sky?", objective: "Explore video of the Chelyabinsk meteor. Categorize data on related phenomena. Develop two models: one for Chelyabinsk changes, one for space object motion. Record questions and investigation ideas for the DQB." },
                        { title: "LESSON 2: How far does Earth's gravity extend into space?", objective: "Predict gravitational force on objects at different distances from Earth. Investigate magnetic forces vs. distance. Analyze data for various objects and distances. Use mathematical models to determine force strength on space objects. Consider if this explains collisions vs. orbits." },
                        { title: "LESSON 3: How does gravity cause only some objects to orbit?", objective: "Use a simulation to figure out the velocity and force relationship needed for orbit. Investigate how distance affects this relationship. Identify orbital period to predict motion. Identify relationship between period and orbital radius." },
                        { title: "LESSON 4: Why do objects sometimes collide in space?", objective: "Explore elliptical orbits and their properties. Read about space objects potentially colliding with Earth. Model Earth and Peekskill meteor orbits to explain their collision. Wonder how to know if crossing orbits will result in a collision." },
                        { title: "LESSON 5: How do objects travel within their orbit paths?", objective: "Predict motion of orbiting objects. Look at an orbit simulation; notice speed changes in elliptical orbits. Use energy thinking to understand this and construct energy transfer diagrams. Predict Chelyabinsk meteor's orbit for comparison with scientists' predictions." },
                        { title: "LESSON 6: How can force interactions in space change the orbital path of a space object?", objective: "Wonder if gravitational forces can change orbital paths; consider two-object model limitations. Look at a solar system image with the asteroid belt; predict what redirected the Chelyabinsk meteor. Develop models for two possibilities: gravitational forces from other objects or collision with another asteroid." },
                        { title: "LESSON 7: What can we do if an orbiting object poses a significant risk for Earth?", objective: "Read about two strategies to deflect hazardous impactors. Use scientific data and mathematical models to explain how these strategies work." }
                    ]
                },
                "Lesson Set 2: How can we know if Earth is at risk for future large-scale, high-energy collisions?": {
                    topic: "Lesson Set 2: How can we know if Earth is at risk for future large-scale, high-energy collisions?",
                    lessons: [
                        { title: "LESSON 8: What is the probability of a future or past meteor event impacting Earth?", objective: "Construct a line of best fit for objects entering Earth's atmosphere vs. mass. Predict frequency of larger-mass objects reaching atmosphere. Estimate potential damage using kinetic energy. Argue for continued investment in DART-like technologies and its implications for Earth's past." },
                        { title: "LESSON 9: What happened to all the meteors that reached Earth over its history?", objective: "Share initial explanations for what happened to different-sized objects from space over Earth's history. Brainstorm factors besides mass affecting outcomes when objects reach Earth. Record new questions and data/investigation sources." },
                        { title: "LESSON 10: What determines the size of the crater made on impact?", objective: "Investigate whether meteor velocity or mass better predicts crater size. Analyze results using correlation coefficient; velocity is a better predictor. Learn that meteors with sufficient kinetic energy can vaporize on impact. Explain matter and energy changes in the meteor-Earth system." },
                        { title: "LESSON 11: What happens to the thousands of objects the size of the Chelyabinsk meteor and smaller that enter Earth's atmosphere every year?", objective: "Analyze data from a satellite test video in a wind tunnel. Explain why little of the Chelyabinsk meteor remained solid. Argue that only a small amount of frequently entering matter impacts the surface." },
                        { title: "LESSON 12: What happens when rocks hit planets or moons with minimal atmosphere?", objective: "Examine images of atmosphere-lacking objects to see impacts. Observe Moon cratering activity over history, finding periods of high/low activity. Consider why large meteor impacts aren't seen on the Moon." },
                        { title: "LESSON 13: Why don't we see many craters on the surface of Earth?", objective: "Analyze data; visible impact cratering is absent in over half of Earth's timeline. Use images to observe less clear features in older terrestrial craters. Use an erosion model to test surface changes. Read about geological processes; explain cratering differences between Moon and Earth." },
                        { title: "LESSON 14: How could an impactor have killed off some types of life on Earth but not all?", objective: "Analyze a graph of mass extinctions. Develop a model for how impactor collision leads to mass extinctions. Gather information about Chicxulub crater formation. Use a Gotta-Have-It Checklist to revise the model to explain selective extinction." },
                        { title: "LESSON 15: How can we use our science ideas to explain the formation of the Moon?", objective: "Revisit the DQB to evaluate answered questions. Complete an assessment task on whether moon rock evidence supports the Moon's formation from a giant impact." }
                    ]
                }
            }
        },
        "Unit 4: Radiation in Our Lives and Its Safety": {
            unit: "Unit 4: Radiation in Our Lives and Its Safety",
            topics: {
                "Lesson Set 1: How does a microwave oven heat up food?": {
                    topic: "Lesson Set 1: How does a microwave oven heat up food?",
                    lessons: [
                        { title: "LESSON 1: How do microwave ovens function, and why does their structure affect wireless signals?", objective: "Read about people storing phones/electronics in microwave ovens. Observe a Bluetooth speaker paired to a device inside a closed microwave. Read the Microwave Oven Manual, safely heat food, and make observations. Model microwave oven structure/function, build a DQB, brainstorm investigations and data needed." },
                        { title: "LESSON 2: How does a microwave oven use electricity to produce microwave radiation?", objective: "Integrate information from the Microwave Oven Manual, a magnetron dissection video, a reading, and a brief investigation. Identify relationship between moving electrons and changing electric fields." },
                        { title: "LESSON 3: How does energy transfer through a wave?", objective: "Recall examples of physical waves and produce waves with a spring. Develop a model of how physical waves transfer energy through solids. Use a computer simulation to plan and carry out four investigations. Make claims for how wave properties affect energy transfer using results. Develop a mathematical model of relationships between properties." },
                        { title: "LESSON 4: How does an antenna transfer energy to matter at a distance?", objective: "Investigate how moving electrons in an antenna cause energy transfer. Use and evaluate different representations of electromagnetic radiation propagating. Read about the mechanism generating electric and magnetic fields from a vibrating charged particle. Develop a mechanistic explanation of electromagnetic radiation and use it to predict interactions with matter in the microwave." },
                        { title: "LESSON 5: How does radiation interact with the parts of the microwave oven system?", objective: "Argue for, plan, and carry out investigations to determine what happens to microwave radiation at the oven door and walls. Develop a model explaining results, showing energy transfer when waves interact with system parts." },
                        { title: "LESSON 6: How can we use interactions between matter and electromagnetic radiation to explain the increase in global temperatures?", objective: "Add new questions to the DQB. Use science ideas about EM radiation interaction with matter to explain how increased greenhouse gases contribute to global temperature rise." },
                        { title: "LESSON 7: Why do some substances heat up faster than other materials in a microwave oven?", objective: "Use simulations to model how different materials (water, plastic, metal) interact with changing electric fields of different frequencies. Connect particle-scale evidence to macroscopic evidence of heating. Model understanding. Read articles about metal safety in microwaves; consider validity and reliability of claims." },
                        { title: "LESSON 8: Why do we see patterns of hot and cold spots in the microwave oven?", objective: "Observe a pattern when light bulbs are placed in the microwave. Use simulations to understand wave interference. Model wave interference from an energy perspective to explain hot/cold spots. Revise initial consensus model and DQB." }
                    ]
                },
                "Lesson Set 2: How do we use electromagnetic radiation safely in our lives?": {
                    topic: "Lesson Set 2: How do we use electromagnetic radiation safely in our lives?",
                    lessons: [
                        { title: "LESSON 9: What other types of EM radiation are there, and how do we use them?", objective: "Examine remaining DQB categories and construct the EM spectrum using wavelength/frequency. Write an argument about the relationship between EM radiation frequency/wavelength and matter interaction, and how this explains EM radiation uses. Add new questions to the DQB." },
                        { title: "LESSON 10: Does all electromagnetic radiation cause damage?", objective: "Question whether higher frequency or amplitude EM radiation increases skin cancer risk. Use multiple evidence sources to identify patterns in frequency, amplitude, and skin cancer. Use wave and photon models to explain evidence." },
                        { title: "LESSON 11: How can we use EM radiation to create and store digital images?", objective: "Read about X-ray interactions with matter for internal body imaging, and digital vs. conventional radiography advantages/disadvantages. Wonder how EM radiation is used in wireless communication to transmit information." },
                        { title: "LESSON 12: How are our wireless electronic devices designed to use EM waves to reliably communicate different types of information?", objective: "Develop ways to send messages with EM waves using a simulation. Develop a model for this system and compare to digital communication. Gather information from multiple sources at four stations. Integrate information with the model to summarize wireless device design for reliable communication." },
                        { title: "LESSON 13: Is communication technology that uses radiation safe?", objective: "Return to DQB to review answered questions. Evaluate social media posts about 5G radiation. Use EM radiation model to argue from evidence about 5G safety." }
                    ]
                }
            }
        },
        "Unit 5: Driving Safety and Vehicle Design": {
            unit: "Unit 5: Driving Safety and Vehicle Design",
            topics: {
                "Lesson Set 1: What factors can make driving more risky?": {
                    topic: "Lesson Set 1: What factors can make driving more risky?",
                    lessons: [
                        { title: "LESSON 1: Why is driving safer today than it was ten years ago, even though the number of vehicle collisions has gone up?", objective: "Develop models showing how distracted driving and vehicle design changes contribute to safety trends. Ask questions about trend causes and develop investigation ideas." },
                        { title: "LESSON 2: How does being distracted affect whether you will avoid a collision?", objective: "Analyze videos of drivers encountering sudden obstacles (undistracted vs. distracted). Plot data to show how distraction affects vehicle motion over time." },
                        { title: "LESSON 3: How does speed affect whether you will avoid a collision?", objective: "Use mathematical models to generate data on how speed affects reaction distance. Identify design features to decrease reaction distances." },
                        { title: "LESSON 4: What affects the amount of time it takes a vehicle to stop after the driver presses the brakes?", objective: "Use a speed vs. time graph to predict how initial speed, braking force, and mass affect stopping time. Collect data to test predictions and graph in CODAP. Use curve fits to identify mathematical relationships. Use a simulation for additional data." },
                        { title: "LESSON 5: Can we use mathematical models to explain differences in stopping in wet conditions?", objective: "Rearrange equations to show a=F/m and F=ma; add to M-E-F triangle to show unbalanced forces cause motion change. Analyze vehicle stopping times in wet/rainy conditions. Complete an Electronic Exit Ticket to predict stopping time for carts with friction." },
                        { title: "LESSON 6: Do our motion relationships help predict any of the interactions or outcomes in a collision?", objective: "Analyze sensor data from cart-barrier and two-cart collisions. Analyze fatality data from different-mass vehicle collisions. Develop an equation for two-vehicle collision outcomes and test with simulation data. Develop and use alternate algebraic models to solve for mass/velocity before/after collision." },
                        { title: "LESSON 7: Can our models be used to predict the motion of real-world vehicles in a collision?", objective: "Apply momentum ideas to an assessment about vehicles colliding with a stopped bus. Look at new data on factors to explore correlations with trends from Lesson 1. Discuss correlation vs. causality. Explore a collision simulation for additional variables; add new questions about safety features to DQB." }
                    ]
                },
                "Lesson Set 2: How are vehicles designed to keep people safe?": {
                    topic: "Lesson Set 2: How are vehicles designed to keep people safe?",
                    lessons: [
                        { title: "LESSON 8: What interactions happen during a vehicle collision, and when do they happen?", objective: "Watch a collision video; determine it's too fast to analyze. Create collision timelines using animation based on simulation data (with/without seatbelt/airbag). Add velocity data from simulation to timelines." },
                        { title: "LESSON 9: How do safety features affect the forces over time on a person during a collision?", objective: "Read about force interactions on drivers during collisions. Predict and collect simulation data on how safety features affect force vs. time. Optimize seatbelt and airbag characteristics in simulation. Explain survivability changes using simulation results." },
                        { title: "LESSON 10: How are the bodies of cars designed to make collisions safer?", objective: "Observe a collision between two cars built 50 years apart. Propose and compare crumple zone designs for driver protection." },
                        { title: "LESSON 11: How do the rigidity and length of the crumple zone influence the safety of the occupants during a collision?", objective: "Analyze crash test results from simulated collisions to identify how crumple zone affects occupant forces. Apply matter, energy, and force concepts to explain how crumple zone design enhances safety." },
                        { title: "LESSON 12: How can we use our models from across the unit to explain how vehicle systems can be designed to increase safety?", objective: "Compare arguments about speed limits, considering science ideas and societal impacts. Construct a Gotta-Have-It Checklist and use it to develop explanations of how criteria and design solutions increase safety." }
                    ]
                },
                "Lesson Set 3: How can we make design decisions that will make driving safer for everyone?": {
                    topic: "Lesson Set 3: How can we make design decisions that will make driving safer for everyone?",
                    lessons: [
                        { title: "LESSON 13: How can we use our science ideas and societal wants and needs to evaluate arguments around design solutions?", objective: "Determine that driving always involves risk, but benefits outweigh risks. Consider other community issues. Use the Argument Comparison Tool to compare arguments about a community-relevant design solution. Survey others for transportation-related issues in the community." },
                        { title: "LESSON 14: What can we do to make driving safer for everyone in our community?", objective: "Develop solutions to driving-related problems using physics models to present proposals." },
                        { title: "LESSON 15: How can we use physics and engineering ideas to make decisions that will make driving safer for everyone?", objective: "Take an end-of-unit, transfer-task assessment. Revisit DQB and determine answered questions. Reflect on and document most important unit learnings." }
                    ]
                }
            }
        },
        "Unit 6: Stars, Their Lives, and the Universe": {
            unit: "Unit 6: Stars, Their Lives, and the Universe",
            topics: {
                "Lesson Set 1: How are stars born, and how do they die?": {
                    topic: "Lesson Set 1: How are stars born, and how do they die?",
                    lessons: [
                        { title: "LESSON 1: Why do some stars seem unchanging, while others appear briefly, change dramatically, and fade away?", objective: "Examine historical evidence of stars appearing and disappearing. Map events on a star map and look for patterns." },
                        { title: "LESSON 2: How does the matter in guest stars compare to stable stars?", objective: "Compare photos of sky regions where guest stars were observed; notice gas/dust remnants. Analyze spectra to determine remnant composition and temperature. Compare stable star spectra to remnant spectra; add to Progress Trackers. Ask new questions and add to DQB." },
                        { title: "LESSON 3: What is happening with matter and energy in stable stars, like our Sun, and how does this help us understand guest stars?", objective: "Consider how studying energy and matter in stable stars helps answer guest star questions and form research groups. Introduced to Planning for Obtaining Information Tool; consider source credibility. Use Obtaining Information Tool to track findings. Consensus on research question answers; record in Progress Trackers and Personal Glossaries. Revisit DQB questions." },
                        { title: "LESSON 4: How does running out of fuel cause a star to change?", objective: "Model macro forces of a star to understand stability from gravity-pressure balance. Develop research questions; introduced to Evaluating Sources of Information Tool. Gather information and communicate findings via gallery tour. Consensus on what causes stars to be stable or unstable; record in Progress Trackers." },
                        { title: "LESSON 5: Why do some stars seem unchanging, while others appear briefly, change dramatically, and fade away?", objective: "Create a Gotta-Have-It Checklist for cause-effect relationships in stars. Individually and collectively model feedback loop keeping stars stable and what happens when disrupted. Update Scale Chart and revisit DQB. Begin wondering about the origin of matter for the first stars." }
                    ]
                },
                "Lesson Set 2: How has the matter in the Universe changed over time?": {
                    topic: "Lesson Set 2: How has the matter in the Universe changed over time?",
                    lessons: [
                        { title: "LESSON 6: How has the matter in the Universe changed over time, and how do we know?", objective: "Look at spectra of stars, galaxies, and empty space for patterns hinting at Universe matter changes. Introduced to PB.L6.HO2; use all four research tools to obtain, evaluate, and communicate ideas. Consensus on evidence pointing to the Big Bang; read about the \"theory\" aspect. Add to Progress Trackers and Personal Glossaries." },
                        { title: "LESSON 7: How can we use the practices and crosscutting concepts we have developed to figure things out on our own?", objective: "Consider how M-E-F triangle frames and understanding of stability and change help make sense of phenomena. Record unanswered questions on DQB; broaden to other phenomena types. Reflect on investigations through online research, future science classes, STEM careers, and lifelong curiosity. Engage in a final transfer task." }
                    ]
                }
            }
        }
    }
};
