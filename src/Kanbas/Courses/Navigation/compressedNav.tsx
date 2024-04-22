function CompressedNav() {
  return (
    <div className="d-flex flex-column" id="nav_main">
    <div className="d-md-none">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
          <div className="container-fluid">
            <a className="navbar-brand" href="../../Navigation/index.html"><i className="fa fa-bars" aria-hidden="true" style={{"color": "white"}}></i></a>
              <div className="d-flex" >
                  <a href="../../Courses/Navigation/index.html"><i className="fa fa-chevron-down" aria-hidden="true" style={{"color": "white"}}></i></a>
              </div>
          </div>
        </nav>
    </div>
</div>
  );
}

export default CompressedNav;