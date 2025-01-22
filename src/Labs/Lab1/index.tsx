export default function Lab1() {
    return (
        <div id="wd-lab1">
            <h2>Lab 1</h2>
            <h3>HTML Examples</h3>
            <div id="wd-h-tag">
                <h4>Heading Tags</h4>
                <p id="wd-p-1">
                Text documents are often broken up into several sections and subsections. 
                Each section is usually prefaced with a short title or heading that attempts to 
                summarize the topic of the section it precedes. For instance this paragraph is 
                preceded by the heading Heading Tags. The font of the section headings are usually 
                larger and bolder than their subsection headings. This document uses headings to 
                introduce topics such as HTML Documents, HTML Tags, Heading Tags, etc. HTML heading 
                tags can be used to format plain text so that it renders in a browser as large 
                headings. There are 6 heading tags for different sizes: h1, h2, h3, h4, h5, and h6. 
                Tag h1 is the largest heading and h6 is the smallest heading.
                </p>
            </div>
            <div id="wd-p-tag">
                <h4>Paragraph Tag</h4>
                <p id="wd-p-1"> ... </p>
                <p id="wd-p-2">
                This is the first paragraph. The paragraph tag is used to format 
                vertical gaps between long pieces of text like this one.
                </p>
                <p id="wd-p-3">
                This is the second paragraph. Even though there is a deliberate white
                gap between the paragraph above and this paragraph, by default
                browsers render them as one contiguous piece of text as shown here on
                the right.
                </p>
                <p id="wd-p-4">
                This is the third paragraph. Wrap each paragraph with the paragraph
                tag to tell browsers to render the gaps.
                </p>
            </div>
            <div id="wd-lists">
                <h4>List Tags</h4>
                <h5>Ordered List Tag</h5>
                How to make pancakes:
                <ol id="wd-pancakes">
                    <li>Mix dry ingredients.</li>
                    <li>Add wet ingredients.</li>
                    <li>Stir to combine.</li>
                    <li>Heat a skillet or griddle.</li>
                    <li>Pour batter onto the skillet.</li>
                    <li>Cook until bubbly on top.</li>
                    <li>Flip and cook the other side.</li>
                    <li>Serve and enjoy!</li>
                </ol>
                My favorite recipe:
                <ol id="wd-your-favorite-recipe">
                    <li>Preheat oven to 350 degrees.</li>
                    <li>
                        In a large mixing bowl, cream 1 cup softened butter and 1 1/2 cups sugar 
                        for 4-5 minutes until light and fluffy. Scrape the sides of the bowl and 
                        add the 2 large eggs and 2 teaspoons vanilla. Cream for 1-2 minutes longer.
                    </li>
                    <li>
                        Stir in  2 3/4 cups flour, 1 1/2 teaspoon cream of tartar, 1/2 teaspoon 
                        baking soda, and 1 teaspoon salt, just until combined.
                    </li>
                    <li>
                        In a small bowl, stir together 1/4 cup sugar and 1 1/2 tablespoon cinnamon. 
                    </li>
                    <li>
                        If time allows, wrap the dough and let refrigerate for 20-30 minutes. 
                        Roll into small balls until round and smooth. Drop into the cinnamon-sugar 
                        mixture and coat well. Using a spoon, coat for a second time, ensuring 
                        the cookie balls are completely covered. *To make flatter snickerdoodles, 
                        press down in the center of the ball before placing in the oven. 
                        This helps to keep them from puffing up in the middle.*
                    </li>
                    <li>
                        Place on a parchment paper-lined baking sheet. Bake for 9-11 minutes. 
                        Let cool for several minutes on baking sheet before removing from the pan.
                    </li>
                </ol>
                <h5>Unordered List Tag</h5>
                My favorite books (in no particular order)
                <ul id="wd-my-books">
                <li>Dune</li>
                <li>Lord of the Rings</li>
                <li>Ender's Game</li>
                <li>Red Mars</li>
                <li>The Forever War</li>
                </ul>
                Your favorite books (in no particular order)
                <ul id="wd-your-books">
                <li>Epic</li>
                <li>Daylight Saving</li>
                <li>Immunity</li>
                <li>Future Shock</li>
                <li>The Gemini Effect</li>
                </ul>
            </div>
            <div id="wd-tables">
                <h4>Table Tag</h4>
                <table border={1} width="100%">
                <thead>
                    <tr>
                    <th>Quiz</th>
                    <th>Topic</th>
                    <th>Date</th>
                    <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Q1</td>
                        <td>CSS</td>
                        <td>01/22/25</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>Q2</td>
                        <td>Bootstrap & Flex</td>
                        <td>01/29/25</td>
                        <td>90</td>
                    </tr>
                    <tr>
                        <td>Q3</td>
                        <td>JavaScript & React</td>
                        <td>02/05/25</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>Q4</td>
                        <td>Routing</td>
                        <td>02/12/25</td>
                        <td>90</td>
                    </tr>
                    <tr>
                        <td>Q5</td>
                        <td>State & Redux</td>
                        <td>02/19/25</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>Q6</td>
                        <td>Node</td>
                        <td>03/12/25</td>
                        <td>90</td>
                    </tr>
                    <tr>
                        <td>Q7</td>
                        <td>Session</td>
                        <td>03/19/25</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>Q8</td>
                        <td>MongoDB</td>
                        <td>03/26/25</td>
                        <td>90</td>
                    </tr>
                    <tr>
                        <td>Q9</td>
                        <td>Mongoose</td>
                        <td>04/02/25</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>Q10</td>
                        <td>APIs</td>
                        <td>04/09/25</td>
                        <td>90</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <td colSpan={3}>Average</td>
                    <td>95</td>
                    </tr>
                </tfoot>
                </table>
            </div>
            <div id="wd-images">
                <h4>Image tag</h4>
                Loading an image from the internet: <br />
                <img id="wd-starship" width="400px"
                src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
                <br />
                Loading a local image:
                <br />
                <img id="wd-teslabot" src="images/teslabot.jpg" height="200px" />
            </div>
            <div id="wd-forms">
                <h4>Form Elements</h4>
                <form id="wd-text-fields">
                    <h5>Text Fields</h5>
                    <label htmlFor="wd-text-fields-username">Username:</label>
                    <input placeholder="jdoe" id="wd-text-fields-username" /> <br />
                    <label htmlFor="wd-text-fields-password">Password:</label>
                    <input type="password" value="123@#$asd" id="wd-text-fields-password" />
                    <br />
                    <label htmlFor="wd-text-fields-first-name">First name:</label>
                    <input type="text" title="John" id="wd-text-fields-first-name" /> <br />
                    <label htmlFor="wd-text-fields-last-name">Last name:</label>
                    <input type="text" placeholder="Doe"
                        value="Wonderland"
                        title="The last name"
                        id="wd-text-fields-last-name" /> <br />
                    <textarea cols="20" rows="25"
                        placeholder="Biography"
                        title="tooltip">Some text
                    </textarea>
                    <h4>Other HTML field types</h4>
                    <label htmlFor="wd-text-fields-email"> Email: </label>
                    <input type="email"
                        placeholder="jdoe@somewhere.com"
                        id="wd-text-fields-email"/><br/>
                    <label htmlFor="wd-text-fields-salary-start"> Starting salary:</label>
                    <input type="number"
                        value="100000"
                        placeholder="1000"
                        id="wd-text-fields-salary-start"/><br/>
                    <label htmlFor="wd-text-fields-rating"> Rating: </label>
                    <input type="range"
                        value="4"
                        max="5"
                        placeholder="Doe"
                        id="wd-text-fields-rating"/><br/>
                    <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
                    <input type="date"
                        value="2000-01-21"
                        id="wd-text-fields-dob"/><br/>
                </form>
            </div>
            <h5 id="wd-buttons">Buttons</h5>
            <button type="button"
                    onClick={() => alert("Life is Good!")}
                    id="wd-all-good">
                Hello World!
            </button>
            <h5 id="wd-radio-buttons">Radio buttons</h5>

            <label>Favorite movie genre:</label><br />

            <input type="radio" name="radio-genre" id="wd-radio-comedy"/>
            <label htmlFor="wd-radio-comedy">Comedy</label><br />

            <input type="radio" name="radio-genre" id="wd-radio-drama"/>
            <label htmlFor="wd-radio-drama">Drama</label><br />

            <input type="radio" name="radio-genre" id="wd-radio-scifi"/>
            <label htmlFor="wd-radio-scifi">Science Fiction</label><br />

            <input type="radio" name="radio-genre" id="wd-radio-fantasy"/>
            <label htmlFor="wd-radio-fantasy">Fantasy</label>

            <h5 id="wd-checkboxes">Checkboxes</h5>
            <label>Favorite movie genre:</label><br/>

            <input type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
            <label htmlFor="wd-chkbox-comedy">Comedy</label><br/>

            <input type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
            <label htmlFor="wd-chkbox-drama">Drama</label><br/>

            <input type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
            <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br/>

            <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
            <label htmlFor="wd-chkbox-fantasy">Fantasy</label>

            <h4 id="wd-dropdowns">Dropdowns</h4>

            <h5>Select one</h5>
            <label  htmlFor="wd-select-one-genre"> Favorite movie genre: </label><br/>
            <select id="wd-select-one-genre">
            <option value="COMEDY">Comedy</option>
            <option value="DRAMA">Drama</option>
            <option selected value="SCIFI">
                Science Fiction</option>
            <option value="FANTASY">Fantasy</option>
            </select>

            <h5>Select many</h5>
            <label  htmlFor="wd-select-many-genre"> Favorite movie genres: </label><br/>
            <select multiple id="wd-select-many-genre">
            <option value="COMEDY" selected> Comedy          </option>
            <option value="DRAMA">           Drama           </option>
            <option value="SCIFI"  selected> Science Fiction </option>
            <option value="FANTASY">         Fantasy         </option>
            </select>
            <h4>Anchor tag</h4>
            <a href="aa.com">
            American Airlines</a><br />
            Please
            &nbsp;<a href="https://www.lipsum.com" id="wd-lipsum">click here</a>&nbsp;
            to get dummy text<br/>
            <a href="https://github.com/TristanOther/kambaz-react-web-app" id="wd-github">This project's GitHub repo (private for academic integrity).</a> 
        </div>
    );
}
  
  