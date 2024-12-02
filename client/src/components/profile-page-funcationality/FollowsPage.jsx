export default function FollowsPage({followerOrFollowingPage, setFollowerOrFollowingPage}){
    return <div
    className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
    onClick={() => setFollowerOrFollowingPage({
        showList: false,
        whichList: ""
    })} 
  >
    <div
      className="w-96 bg-black rounded-lg shadow-lg"
      onClick={(e) => e.stopPropagation()} 
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold text-white">{followerOrFollowingPage.whichList}</h3>
        <button
          onClick={() => setFollowerOrFollowingPage({
            showList: false,
            whichList: ""
        })}
          className="text-gray-200 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/*  List */}
      <div className="p-4 max-h-96 overflow-y-auto text-white">
        {/* {followers.map((follower, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div>
                <p className="font-medium">{follower.username}</p>
                <p className="text-sm text-gray-500">{follower.name}</p>
              </div>
            </div>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md">
              Follow
            </button>
          </div>
        ))} */}
        hello
      </div>
    </div>
  </div>
}