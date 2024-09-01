

function MakeRequest(){
    const today = new Date().toISOString().slice(0, 16);
    return (
        <div>
            <div className="bg-bloodred1/10 p-5 rounded-xl">
                <form className="">
                    <div className="flex flex-col space-y-5">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="Title" className="">Title</label>
                            <input type="text" name="Title" className="h-12 border-2 rounded-xl px-3" placeholder=""/>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="Location" className="">Location</label>
                            <input type="text" name="Location" className="h-12 border-2 rounded-xl px-3" placeholder="Enter location"/>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="Date" className="">Date</label>
                            <input type="datetime-local" name="Date" className="h-12 border-2 rounded-xl px-3" min={today}/>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="BloodGroup" className="">Blood Group</label>
                            <select name="BloodGroup" className="h-12 border-2 rounded-xl px-3">
                            <option value="select">Select</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>                               
                            </select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="Message" className="">Message</label>
                            <textarea type="text" name="Message" className="h-32 border-2 rounded-xl px-3"/>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-bloodred3 text-white h-12 w-full rounded-full">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MakeRequest;