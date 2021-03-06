<?php

/**
 * @file
 * Provide views data for anu_content_administration.module.
 */

/**
 * Implements hook_views_data_alter().
 */
function anu_content_administration_views_data_alter(array &$data) {

  // Custom field to display node groups (classes).
  $data['node']['node_groups'] = [
    'title' => t('Node groups'),
    'field' => [
      'title' => t('Node groups'),
      'help' => t('List of node groups.'),
      'id' => 'anu_node_groups',
    ],
    'filter' => [
      'title' => t('Group filter'),
      'help' => t('Filters nodes by groups they belong to'),
      'field' => 'nid',
      'id' => 'anu_node_groups_filter',
    ],
  ];
  $data['node']['course_lessons'] = [
    'title' => t('Course lessons'),
    'field' => [
      'title' => t('Course Lessons'),
      'help' => t('List of course lessons.'),
      'id' => 'anu_course_lessons',
    ],
    'filter' => [
      'title' => t('Course lessons filter'),
      'help' => t('Filters course lessons by title'),
      'field' => 'nid',
      'id' => 'anu_course_lessons_filter',
    ],
  ];
  $data['node']['course_organization'] = [
    'title' => t('Course organization'),
    'filter' => [
      'title' => t('Course organization'),
      'field' => 'nid',
      'id' => 'anu_course_organization',
    ],
  ];

}
