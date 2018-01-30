import React, { Fragment } from 'react';
import Empty from '../../../atoms/Empty';
import Card from '../../../moleculas/CardCourse';

export default ({ classes, coursesInClassesIds, recentCoursesIds, coursesById }) => (
  <div className="student-dashboard container pb-5">

    {recentCoursesIds.length > 0 &&
    <Fragment>

      <h4>Recent Courses</h4>

      <div className="row">
        {recentCoursesIds.map(courseId => (
          <div key={courseId} className="col-12 col-md-6 col-lg-4 mb-5">
            <Card course={coursesById[courseId]} />
          </div>
        ))}
      </div>

    </Fragment>
    }

    {classes.length > 0 && classes.map(classItem => (
      <Fragment key={classItem.uuid}>

        <h4>{classItem.label}</h4>

        <div className="row">
          {coursesInClassesIds[classItem.uuid].length > 0 &&
          coursesInClassesIds[classItem.uuid].map(courseId => (
            <div key={courseId} className="col-12 col-md-6 col-lg-4 mb-5">
              <Card course={coursesById[courseId]} />
            </div>
          ))}
        </div>

        {!coursesInClassesIds[classItem.uuid].length &&
        <Empty message="No available courses yet." />
        }

      </Fragment>
    ))}

    {!classes.length &&
    <Empty message={"You haven't been added to any class yet. Please contact your instructor."} />
    }

  </div>
);