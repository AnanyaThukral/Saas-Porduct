
//fetch the data from json file
//returns the array of objects
//fetch returns a promise
const getJobs = () => {
    return fetch('data.json')
    .then(response => response.json())
    .then(data=> {
       return data
    })
}


const filterJobs = (jobs, searchText) => {
    if(searchText){
        let filteredItems = jobs.filter(job=> {
            if(job.roleName.toLowerCase().includes(searchText)
                || job.type.toLowerCase().includes(searchText)
                || job.company.toLowerCase().includes(searchText)
                || job.requirements.content.toLowerCase().includes(searchText)){
                    return true
                } else {
                    return false
                }
        })

        return filteredItems
    }
    else{
        return jobs //if nothing in search - return all jobs
    }
}

document.querySelector('.button-container')
.addEventListener('click', () => {
    let text = document.querySelector('#filter-jobs').value 
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, text)
        showJobs(filteredJobs)
    }) 
})


const showJobs = (jobs) => {
    //console.log(jobs)
    let jobsContainer = document.querySelector('.jobs-container')
    let jobsHTML = ""
    jobs.forEach(job => {
        jobsHTML += `
        <div class="job-tile">
            <div class="top">
                <img src="${job.logo}" alt="">
                <span class="material-icons more_horiz">more_horiz</span>
            </div>
            <div class="rolename">
                <span>${job.roleName}</span>
            </div>
            <div class="description">
                <span>${job.requirements.content}</span>
            </div>
            <div class="buttons">
                <div class="button apply-now">
                    Apply Now
                </div>
                <div class="button">
                        Message
                </div>
            </div>
        </div>
       `
    })

    //console.log(jobsHTML)
    jobsContainer.innerHTML = jobsHTML

}

getJobs().then(data=>{
    showJobs(data)
})



